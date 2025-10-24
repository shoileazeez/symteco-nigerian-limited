import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail, MessageSquare, Reply, Eye, Clock, CheckCircle, RefreshCw, User, Building, FileText, AlertCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAuthHeader } from '../../../hooks/use-auth';

interface Message {
  id: string;
  type: 'quote' | 'contact';
  from: string;
  fromName: string;
  fromEmail: string;
  phone?: string;
  company?: string;
  service?: string;
  to: string;
  subject: string;
  textContent?: string;
  summary?: string;
  body?: string;
  receivedAt: string;
  read: boolean;
  hasAttachments?: boolean;
  conversationId?: string;
  
  // Quote-specific fields
  projectLocation?: string;
  timeline?: string;
  budget?: string;
  details?: string;
}

interface MessageStats {
  total: number;
  unread: number;
  quotes: number;
  contacts: number;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<MessageStats>({ total: 0, unread: 0, quotes: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageDetails, setMessageDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/messages', {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.messages);
        setStats(data.stats);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch messages',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

    const markAsRead = async (messageId: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        }
      });
      
      if (response.ok) {
        setMessages(messages.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        ));
        setStats(prev => ({ ...prev, unread: prev.unread - 1 }));
        toast({
          title: 'Success',
          description: 'Message marked as read',
        });
      } else {
        console.error('Failed to mark message as read:', response.status);
        toast({
          title: 'Error',
          description: 'Failed to mark message as read',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark message as read',
        variant: 'destructive',
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({ messageId })
      });

      if (response.ok) {
        const deletedMessage = messages.find(msg => msg.id === messageId);
        setMessages(messages.filter(msg => msg.id !== messageId));
        
        // Update stats
        setStats(prev => ({
          total: prev.total - 1,
          unread: deletedMessage && !deletedMessage.read ? prev.unread - 1 : prev.unread,
          quotes: deletedMessage?.type === 'quote' ? prev.quotes - 1 : prev.quotes,
          contacts: deletedMessage?.type === 'contact' ? prev.contacts - 1 : prev.contacts,
        }));

        // Close dialog if this message was open
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(null);
          setMessageDetails(null);
        }

        toast({
          title: "Success",
          description: "Message deleted successfully",
        });
      } else {
        throw new Error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const confirmDeleteMessage = async (message: Message) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${message.type} from ${message.fromName}?\n\nThis action cannot be undone.`
    );
    
    if (confirmed) {
      await deleteMessage(message.id);
    }
  };

  const parseMessageContent = (message: any) => {
    // Now we can get structured data directly from the database fields
    const parsed = {
      name: message.fromName || '',
      email: message.fromEmail || '',
      phone: message.phone || '',
      company: message.company || '',
      service: message.service || '',
      projectLocation: message.projectLocation || '',
      timeline: message.timeline || '',
      budget: message.budget || '',
      fullMessage: message.body || message.textContent || message.summary || '',
      details: message.details || ''
    };

    // If database fields are empty, try to parse from message content as fallback
    if (!parsed.phone && !parsed.company && !parsed.service && !parsed.projectLocation) {
      const content = parsed.fullMessage;
      
      const phoneMatch = content.match(/Phone[:\s]*([^\n\r]+)/i);
      if (phoneMatch) parsed.phone = phoneMatch[1].trim();

      const companyMatch = content.match(/Company[:\s]*([^\n\r]+)/i);
      if (companyMatch) parsed.company = companyMatch[1].trim();

      const serviceMatch = content.match(/Service[:\s]*([^\n\r]+)/i);
      if (serviceMatch) parsed.service = serviceMatch[1].trim();

      const locationMatch = content.match(/(?:Project\s*)?Location[:\s]*([^\n\r]+)/i);
      if (locationMatch) parsed.projectLocation = locationMatch[1].trim();

      const timelineMatch = content.match(/Timeline[:\s]*([^\n\r]+)/i);
      if (timelineMatch) parsed.timeline = timelineMatch[1].trim();

      const budgetMatch = content.match(/Budget[:\s]*([^\n\r]+)/i);
      if (budgetMatch) parsed.budget = budgetMatch[1].trim();
    }

    return parsed;
  };

  const generateGmailReplyTemplate = (messageData: any) => {
    const isQuote = messageData.type === 'quote';
    const clientName = messageData.name || 'Valued Client';
    
    const subject = isQuote 
      ? `Quote Response: ${messageData.service || 'Your Project Request'} - Symteco Nigerian Limited`
      : `Re: ${messageData.subject || 'Your Inquiry'} - Symteco Nigerian Limited`;

    const body = `Dear ${clientName},

Thank you for ${isQuote ? 'your quote request' : 'contacting'} Symteco Nigerian Limited. We appreciate your interest in our professional electrical and mechanical engineering services.

${isQuote ? `We have received your request for ${messageData.service || 'engineering services'}${messageData.projectLocation ? ` in ${messageData.projectLocation}` : ''} and our technical team is reviewing the requirements.` : 'We have received your inquiry and will provide you with the information you need.'}

${isQuote ? `**Quote Request Summary:**
${messageData.service ? `- Service Required: ${messageData.service}` : ''}
${messageData.projectLocation ? `- Project Location: ${messageData.projectLocation}` : ''}
${messageData.timeline ? `- Timeline: ${messageData.timeline}` : ''}
${messageData.budget ? `- Budget Range: ${messageData.budget}` : ''}

**Next Steps:**
1. Our technical team will conduct a thorough review of your requirements
2. We may contact you for additional specifications if needed
3. You will receive a detailed proposal within 2-3 business days
4. We can schedule a consultation to discuss project details
5. Site visit can be arranged for accurate assessment

**Priority Response:** Quote requests receive expedited handling during business hours (8 AM - 6 PM, Monday-Friday).` : `**How We'll Assist You:**
- Dedicated support for your inquiry
- Expert consultation on your electrical/mechanical needs  
- Customized solutions for your specific requirements
- Professional project assessment and recommendations`}

**Contact Information:**
📧 Email: ibrotech144@gmail.com
📞 Phone: 08058244486 / 08087865823
🌐 Website: symteconigerialimited.com
📍 Address: Suite 11, LSDPC Phase 1 Shopping Complex, Oba Ogunji Road, Pen-Cinema, Agege, Lagos

Best regards,

**Symteco Nigerian Limited Team**
Professional Electrical & Mechanical Engineering Solutions

---
*This email was sent in response to your inquiry received on ${new Date(messageData.receivedAt).toLocaleDateString()}. For immediate assistance, please call our support line.*`;

    return {
      subject,
      body: encodeURIComponent(body),
      to: messageData.email
    };
  };

  const openMessageDetails = async (message: Message) => {
    setSelectedMessage(message);
    setLoadingDetails(true);
    
    try {
      // Fetch full message details from the conversation endpoint
      const response = await fetch(`/api/admin/conversations/${message.conversationId || message.id}`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.conversation) {
          setMessageDetails(data.conversation);
        }
      }
    } catch (error) {
      console.error('Error fetching message details:', error);
    } finally {
      setLoadingDetails(false);
    }
    
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredMessages = messages.filter(message => {
    if (activeTab === 'all') return true;
    if (activeTab === 'quotes') return message.type === 'quote';
    if (activeTab === 'contacts') return message.type === 'contact';
    if (activeTab === 'unread') return !message.read;
    return true;
  });

  if (loading) {
    return (
      <AdminLayout title="Messages">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Messages">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Message Center</h2>
            <p className="text-gray-600 mt-1">
              Manage customer inquiries and quote requests
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={fetchMessages}
            className="flex items-center space-x-2 hover:bg-primary hover:text-white transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-blue-700">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                Total Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{stats.total}</div>
              <div className="text-sm text-blue-600 mt-1">All communications</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50 hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-orange-700">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                Unread
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.unread}</div>
              <div className="text-sm text-orange-600 mt-1">Need attention</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-primary/10 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-primary">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                Quote Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.quotes}</div>
              <div className="text-sm text-primary/70 mt-1">Business opportunities</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50 hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-green-700">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                Contact Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.contacts}</div>
              <div className="text-sm text-green-600 mt-1">General inquiries</div>
            </CardContent>
          </Card>
        </div>

        {/* Messages */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-xl border-b border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Message Center</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    View and respond to customer inquiries and quote requests
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 sm:mb-8 bg-gradient-to-r from-primary/5 to-secondary/5 p-1 rounded-xl border-0 shadow-inner grid grid-cols-2 sm:grid-cols-4 w-full">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary rounded-xl transition-all duration-300 px-3 sm:px-6 py-2 text-xs sm:text-sm"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="unread"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-orange-600 rounded-xl transition-all duration-300 px-3 sm:px-6 py-2 text-xs sm:text-sm"
                >
                  Unread ({stats.unread})
                </TabsTrigger>
                <TabsTrigger 
                  value="quotes"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary rounded-xl transition-all duration-300 px-3 sm:px-6 py-2 text-xs sm:text-sm"
                >
                  Quotes ({stats.quotes})
                </TabsTrigger>
                <TabsTrigger 
                  value="contacts"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-green-600 rounded-xl transition-all duration-300 px-3 sm:px-6 py-2 text-xs sm:text-sm"
                >
                  Contacts ({stats.contacts})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-12 sm:py-16">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {activeTab === 'unread' ? 'No unread messages' : 'No messages found'}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                      Messages will appear here when customers send quotes or contact forms
                    </p>
                    <Button 
                      onClick={fetchMessages}
                      className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Messages
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Mobile Card View */}
                    <div className="block lg:hidden space-y-4">
                      {filteredMessages.map((message) => (
                        <Card key={message.id} className={`border ${!message.read ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : 'border-gray-200'}`}>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium text-gray-900 text-sm truncate">
                                      {message.from}
                                    </h3>
                                    {!message.read && <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></span>}
                                  </div>
                                  <p className="text-sm text-gray-600 truncate mb-2">{message.subject}</p>
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    <Badge 
                                      variant={message.type === 'quote' ? 'default' : 'secondary'}
                                      className={`text-xs ${message.type === 'quote' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                      {message.type === 'quote' ? '💼 Quote' : '📧 Contact'}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {formatDate(message.receivedAt)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                  {message.read ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Clock className="h-4 w-4 text-orange-500" />
                                  )}
                                  <span className="text-xs text-gray-500">
                                    {message.read ? 'Read' : 'Unread'}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button  
                                    variant="outline"  
                                    size="sm" 
                                    onClick={() => openMessageDetails(message)} 
                                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-300"
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button  
                                    variant="outline"  
                                    size="sm" 
                                    onClick={() => confirmDeleteMessage(message)} 
                                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden lg:block rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:bg-gray-100">
                            <TableHead className="font-semibold text-gray-700">From</TableHead>
                            <TableHead className="font-semibold text-gray-700">Subject</TableHead>
                            <TableHead className="font-semibold text-gray-700">Type</TableHead>
                            <TableHead className="font-semibold text-gray-700">Received</TableHead>
                            <TableHead className="font-semibold text-gray-700">Status</TableHead>
                            <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredMessages.map((message) => (
                            <TableRow 
                              key={message.id} 
                              className={`hover:bg-gray-50 transition-colors ${!message.read ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''}`}
                            >
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  {message.from}
                                  {!message.read && <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>}
                                </div>
                              </TableCell>
                              <TableCell className="max-w-xs">
                                <div className="truncate font-medium">{message.subject}</div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={message.type === 'quote' ? 'default' : 'secondary'}
                                  className={message.type === 'quote' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}
                                >
                                  {message.type === 'quote' ? '💼 Quote Request' : '📧 Contact'}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-gray-600">
                                {formatDate(message.receivedAt)}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {message.read ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Clock className="h-4 w-4 text-orange-500" />
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center gap-2 justify-end">
                                  <Button  
                                    variant="outline"  
                                    size="sm" 
                                    onClick={() => openMessageDetails(message)} 
                                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-300"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button  
                                    variant="outline"  
                                    size="sm" 
                                    onClick={() => confirmDeleteMessage(message)} 
                                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Enhanced Message Details Dialog */}
        <Dialog open={!!selectedMessage} onOpenChange={() => {
          setSelectedMessage(null);
          setMessageDetails(null);
        }}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden w-[95vw] sm:w-full">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-lg sm:text-2xl font-bold flex items-center text-gray-900">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mr-3 shadow-lg ${
                  selectedMessage?.type === 'quote' 
                    ? 'bg-gradient-to-br from-primary to-primary/80' 
                    : 'bg-gradient-to-br from-green-500 to-green-600'
                }`}>
                  {selectedMessage?.type === 'quote' ? (
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  ) : (
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  )}
                </div>
                <span className="truncate">{selectedMessage?.subject}</span>
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base mt-2">
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={selectedMessage?.type === 'quote' ? 'default' : 'secondary'}
                      className={`text-xs ${selectedMessage?.type === 'quote' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {selectedMessage?.type === 'quote' ? '💼 Quote Request' : '📧 Contact Message'}
                    </Badge>
                  </div>
                  <span className="text-xs sm:text-sm"><strong>From:</strong> {selectedMessage?.fromName} ({selectedMessage?.from})</span>
                  <span className="text-xs sm:text-sm"><strong>Received:</strong> {selectedMessage ? formatDate(selectedMessage.receivedAt) : ''}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            {loadingDetails ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : messageDetails ? (
              <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[60vh] pr-2">
                {messageDetails.messages?.map((msg: any, index: number) => (
                  <div key={msg.id || index} className="space-y-4">
                    {/* Message Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                            msg.type === 'quote' 
                              ? 'bg-primary text-white' 
                              : 'bg-green-500 text-white'
                          }`}>
                            {msg.fromName?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">{msg.fromName}</div>
                            <div className="text-xs sm:text-sm text-gray-500 break-all">{msg.fromEmail}</div>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-xs sm:text-sm text-gray-500">{formatDate(msg.receivedAt)}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            {msg.read ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Read
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                Unread
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Subject */}
                      <div className="mb-3">
                        <div className="text-xs sm:text-sm text-gray-600 font-medium">Subject:</div>
                        <div className="text-gray-900 font-semibold text-sm sm:text-base break-words">{msg.subject}</div>
                      </div>
                    </div>
                    
                    {/* Message Content */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-3 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-gray-700">Message Content</span>
                        </div>
                      </div>
                      
                      <div className="p-4 sm:p-6">
                        {(() => {
                          const messageData = parseMessageContent(msg);
                          const gmailTemplate = generateGmailReplyTemplate({
                            ...messageData,
                            type: msg.type,
                            receivedAt: msg.receivedAt,
                            subject: msg.subject
                          });

                          return (
                            <div className="space-y-4 sm:space-y-6">
                              {/* Client Information Section */}
                              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 sm:p-5 border border-blue-100">
                                <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2">
                                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                                  Client Information
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                  <div>
                                    <label className="text-xs sm:text-sm font-medium text-gray-600">Name</label>
                                    <p className="text-gray-900 font-medium text-sm sm:text-base break-words">{messageData.name || 'Not provided'}</p>
                                  </div>
                                  <div>
                                    <label className="text-xs sm:text-sm font-medium text-gray-600">Email</label>
                                    <p className="text-gray-900 font-medium text-sm sm:text-base break-all">{messageData.email || 'Not provided'}</p>
                                  </div>
                                  {messageData.phone && (
                                    <div>
                                      <label className="text-xs sm:text-sm font-medium text-gray-600">Phone</label>
                                      <p className="text-gray-900 font-medium text-sm sm:text-base">{messageData.phone}</p>
                                    </div>
                                  )}
                                  {messageData.company && (
                                    <div>
                                      <label className="text-xs sm:text-sm font-medium text-gray-600">Company</label>
                                      <p className="text-gray-900 font-medium text-sm sm:text-base break-words">{messageData.company}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Service & Project Details (for both contacts and quotes) */}
                              {(messageData.service || messageData.projectLocation || messageData.timeline || messageData.budget) && (
                                <div className={`bg-gradient-to-br ${msg.type === 'quote' ? 'from-orange-50 to-white border-orange-100' : 'from-green-50 to-white border-green-100'} rounded-lg p-4 sm:p-5 border`}>
                                  <h4 className={`text-base sm:text-lg font-semibold ${msg.type === 'quote' ? 'text-orange-900' : 'text-green-900'} mb-3 sm:mb-4 flex items-center gap-2`}>
                                    <Building className="h-4 w-4 sm:h-5 sm:w-5" />
                                    {msg.type === 'quote' ? 'Project Requirements' : 'Service & Project Information'}
                                  </h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {messageData.service && (
                                      <div>
                                        <label className="text-xs sm:text-sm font-medium text-gray-600">Service {msg.type === 'quote' ? 'Required' : 'Interested'}</label>
                                        <p className="text-gray-900 font-medium text-sm sm:text-base break-words">{messageData.service}</p>
                                      </div>
                                    )}
                                    {messageData.projectLocation && (
                                      <div>
                                        <label className="text-xs sm:text-sm font-medium text-gray-600">Project Location</label>
                                        <p className="text-gray-900 font-medium text-sm sm:text-base break-words">{messageData.projectLocation}</p>
                                      </div>
                                    )}
                                    {messageData.timeline && (
                                      <div>
                                        <label className="text-xs sm:text-sm font-medium text-gray-600">Timeline</label>
                                        <p className="text-gray-900 font-medium text-sm sm:text-base break-words">{messageData.timeline}</p>
                                      </div>
                                    )}
                                    {messageData.budget && (
                                      <div>
                                        <label className="text-xs sm:text-sm font-medium text-gray-600">Budget Range</label>
                                        <p className="text-gray-900 font-medium text-sm sm:text-base break-words">{messageData.budget}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Full Message Content */}
                              <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                                  Full Message
                                </h4>
                                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border">
                                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-xs sm:text-base break-words">
                                    {messageData.fullMessage || 'No message content available'}
                                  </div>
                                </div>
                              </div>

                              {/* Gmail Reply Section */}
                              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 sm:p-5 border border-green-200">
                                <h4 className="text-base sm:text-lg font-semibold text-green-900 mb-3 sm:mb-4 flex items-center gap-2">
                                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                                  2-Hour Reply Commitment
                                </h4>
                                <div className="space-y-3 sm:space-y-4">
                                  <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                                    <strong>Professional Response Standard:</strong> All {msg.type === 'quote' ? 'quote requests' : 'inquiries'} 
                                    receive acknowledgment within 2 hours during business hours (8 AM - 6 PM, Monday-Friday).
                                  </p>
                                  
                                  <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200">
                                    <h5 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">Quick Gmail Reply</h5>
                                    <p className="text-xs sm:text-sm text-green-700 mb-3">
                                      Click the button below to open Gmail with a pre-filled professional response template:
                                    </p>
                                    
                                    <a
                                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${gmailTemplate.to}&su=${gmailTemplate.subject}&body=${gmailTemplate.body}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm text-sm w-full sm:w-auto justify-center"
                                    >
                                      <Mail className="h-4 w-4" />
                                      Reply via Gmail
                                    </a>
                                    
                                    <div className="mt-2 sm:mt-3 text-xs text-green-600">
                                      <p><strong>Template includes:</strong> Professional greeting, project summary, next steps, and company contact information</p>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                    <div className="flex items-start gap-2">
                                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                      <div className="text-xs text-yellow-800">
                                        <p><strong>Response Priority:</strong> {msg.type === 'quote' ? 'Quote requests' : 'General inquiries'} during business hours should be acknowledged within 2 hours. After-hours messages receive response by next business day 9 AM.</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                        
                        {/* Attachments Info */}
                        {msg.hasAttachments && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center space-x-2 text-blue-700">
                              <Mail className="h-4 w-4" />
                              <span className="text-sm font-medium">This message may contain attachments</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between pt-4 border-t border-gray-200 sticky bottom-0 bg-white gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => selectedMessage && confirmDeleteMessage(selectedMessage)}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 order-2 sm:order-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Message
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 order-1 sm:order-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedMessage(null);
                        setMessageDetails(null);
                      }}
                      className="px-6"
                    >
                      Close
                    </Button>
                    {selectedMessage && !selectedMessage.read && (
                      <Button 
                        onClick={() => {
                          if (selectedMessage) {
                            markAsRead(selectedMessage.id);
                            setSelectedMessage(null);
                            setMessageDetails(null);
                          }
                        }}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg transition-all duration-300 px-6 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Failed to load message details</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

// No server-side props needed with JWT auth
