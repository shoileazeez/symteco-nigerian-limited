// Test endpoint to simulate incoming messages for development/testing
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

// In a real application, this would be stored in a database
// For now, we'll use the same in-memory store as the webhook
let messages: any[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Generate test messages
    const testMessages = [
      {
        id: uuidv4(),
        type: 'quote',
        from: 'john.doe@example.com',
        to: 'admin@symtecoltd.com',
        subject: 'Quote Request for Road Construction Project',
        textContent: `Dear Symteco Nigerian Limited,

I hope this email finds you well. I am writing to request a quote for a road construction project we are planning in Lagos State.

Project Details:
- Location: Victoria Island, Lagos
- Road Length: Approximately 2.5 kilometers
- Road Type: Asphalt road with proper drainage
- Timeline: Expected completion within 6 months
- Budget Range: ₦50-80 million

We would appreciate if you could provide:
1. Detailed cost breakdown
2. Project timeline
3. Materials specification
4. Quality assurance procedures

Please let me know if you need any additional information.

Best regards,
John Doe
Project Manager
Lagos State Infrastructure Development`,
        htmlContent: '',
        receivedAt: new Date().toISOString(),
        read: false,
        replied: false,
      },
      {
        id: uuidv4(),
        type: 'contact',
        from: 'sarah.wilson@company.com',
        to: 'info@symtecoltd.com',
        subject: 'Inquiry about Building Construction Services',
        textContent: `Hello,

I came across your website and was impressed by your portfolio of construction projects. We are looking for a reliable construction company for our upcoming office building project.

Could you please provide information about:
- Your experience with commercial buildings
- Available services
- General pricing structure
- References from recent projects

We would like to schedule a meeting to discuss our requirements in detail.

Thank you for your time.

Best regards,
Sarah Wilson
Facilities Manager
Wilson & Associates`,
        htmlContent: '',
        receivedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        read: false,
        replied: false,
      },
      {
        id: uuidv4(),
        type: 'quote',
        from: 'michael.brown@gov.ng',
        to: 'projects@symtecoltd.com',
        subject: 'Government Contract - Bridge Construction Quote',
        textContent: `Dear Sir/Madam,

The Federal Ministry of Works is inviting quotes for a bridge construction project across River Niger.

Project Specifications:
- Bridge Type: Reinforced concrete bridge
- Span: 150 meters
- Load Capacity: 40 tons
- Location: Onitsha-Asaba axis
- Contract Duration: 18 months

Required Documents:
- Company profile and certifications
- Previous bridge construction experience
- Financial capacity statement
- Technical proposal
- Cost estimate

Submission Deadline: 30 days from this notice

Please confirm receipt of this email and your interest in bidding.

Yours faithfully,
Michael Brown
Director of Projects
Federal Ministry of Works`,
        htmlContent: '',
        receivedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        read: true,
        replied: false,
      },
      {
        id: uuidv4(),
        type: 'contact',
        from: 'info@techcorp.ng',
        to: 'admin@symtecoltd.com',
        subject: 'Partnership Opportunity',
        textContent: `Good day,

We are TechCorp Nigeria, a technology solutions provider. We are interested in exploring partnership opportunities with your construction company.

Our services include:
- Project management software
- IoT solutions for construction monitoring
- Digital payment systems
- Quality control applications

We believe our technology solutions can help optimize your construction processes and improve project delivery.

Would you be available for a meeting next week to discuss potential collaboration?

Kind regards,
Technology Partnerships Team
TechCorp Nigeria`,
        htmlContent: '',
        receivedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        read: true,
        replied: true,
      }
    ];

    // Add test messages to the store (this would normally be in a database)
    // For simplicity, we'll export the messages to be imported by the messages API
    global.testMessages = testMessages;

    res.status(200).json({ 
      success: true, 
      message: 'Test messages generated successfully',
      count: testMessages.length 
    });

  } catch (error) {
    console.error('Error generating test messages:', error);
    res.status(500).json({ error: 'Failed to generate test messages' });
  }
}