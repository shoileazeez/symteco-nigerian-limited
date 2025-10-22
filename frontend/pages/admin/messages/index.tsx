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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail, MessageSquare, Reply, Eye, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'quote' | 'contact';
  from: string;
  to: string;
  subject: string;
  textContent: string;
  htmlContent: string;
  receivedAt: string;
  read: boolean;
  replied: boolean;
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
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyDialog, setReplyDialog] = useState<Message | null>(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async (type?: string) => {
    try {
      setLoading(true);
      const url = type ? `/api/admin/messages?type=${type}` : '/api/admin/messages';
      const response = await fetch(url);
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
      const response = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, read: true }),
      });

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        ));
        setStats(prev => ({ ...prev, unread: Math.max(0, prev.unread - 1) }));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const openReplyDialog = (message: Message) => {
    setReplyDialog(message);
    setReplySubject(`Re: ${message.subject}`);
    setReplyMessage('');
    
    // Mark as read when opening reply
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  const sendReply = async () => {
    if (!replyDialog || !replySubject.trim() || !replyMessage.trim()) {
      toast({
        title: 'Error',
        description: 'Subject and message are required',
        variant: 'destructive',
      });
      return;
    }

    setSendingReply(true);
    try {
      const response = await fetch('/api/admin/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: replyDialog.from,
          subject: replySubject,
          message: replyMessage,
          originalMessageId: replyDialog.id,
          replyType: replyDialog.type,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Mark as replied
        const response2 = await fetch('/api/admin/messages', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messageId: replyDialog.id, replied: true }),
        });

        if (response2.ok) {
          setMessages(messages.map(msg => 
            msg.id === replyDialog.id ? { ...msg, replied: true } : msg
          ));
        }

        toast({
          title: 'Success',
          description: 'Reply sent successfully',
        });
        setReplyDialog(null);
        setReplySubject('');
        setReplyMessage('');
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to send reply',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send reply',
        variant: 'destructive',
      });
    } finally {
      setSendingReply(false);
    }
  };

  const viewMessage = (message: Message) => {
    setSelectedMessage(message);
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Message Center</h2>
            <p className="text-sm text-muted-foreground">
              Manage quotes, contacts, and customer communications
            </p>
          </div>
          <Button variant="secondary" onClick={() => fetchMessages()}>
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Total Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Unread
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{stats.unread}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Quote Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.quotes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Contact Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.contacts}</div>
            </CardContent>
          </Card>
        </div>

        {/* Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              View and respond to customer inquiries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Messages</TabsTrigger>
                <TabsTrigger value="unread">Unread ({stats.unread})</TabsTrigger>
                <TabsTrigger value="quotes">Quotes ({stats.quotes})</TabsTrigger>
                <TabsTrigger value="contacts">Contacts ({stats.contacts})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {activeTab === 'unread' ? 'No unread messages' : 'No messages found'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Messages will appear here when customers send quotes or contact forms
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>From</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Received</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMessages.map((message) => (
                        <TableRow key={message.id} className={!message.read ? 'bg-muted/50' : ''}>
                          <TableCell className="font-medium">
                            {message.from}
                            {!message.read && <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {message.subject}
                          </TableCell>
                          <TableCell>
                            <Badge variant={message.type === 'quote' ? 'default' : 'secondary'}>
                              {message.type === 'quote' ? 'Quote Request' : 'Contact'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(message.receivedAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {message.read ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <Clock className="h-4 w-4 text-orange-500" />
                              )}
                              {message.replied && (
                                <Reply className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => viewMessage(message)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>{message.subject}</DialogTitle>
                                    <DialogDescription>
                                      From: {message.from} • {formatDate(message.receivedAt)}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="max-h-96 overflow-y-auto">
                                    <div className="whitespace-pre-wrap text-sm">
                                      {message.textContent}
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openReplyDialog(message)}
                              >
                                <Reply className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Reply Dialog */}
        <Dialog open={!!replyDialog} onOpenChange={() => setReplyDialog(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reply to Message</DialogTitle>
              <DialogDescription>
                Replying to: {replyDialog?.from}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="replySubject">Subject</Label>
                <Input
                  id="replySubject"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="replyMessage">Message</Label>
                <Textarea
                  id="replyMessage"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={8}
                  placeholder="Type your reply here..."
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setReplyDialog(null)}>
                  Cancel
                </Button>
                <Button className="bg-primary text-primary-foreground" onClick={sendReply} disabled={sendingReply}>
                  {sendingReply ? 'Sending...' : 'Send Reply'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

// Ensure this page is server-side rendered and protected during build
export async function getServerSideProps(context: any) {
  const { getSession } = await import('next-auth/react');
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
}