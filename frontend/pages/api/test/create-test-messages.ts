import type { NextApiRequest, NextApiResponse } from 'next';
import { messageStore } from '../webhooks/mailjet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Clear existing messages
    messageStore.splice(0, messageStore.length);

    // Create test messages
    const testMessages = [
      {
        id: 'test-' + Date.now() + '-1',
        type: 'quote' as const,
        from: 'john.engineer@construction.com',
        to: process.env.MJ_RECEIVER_EMAIL || 'admin@symteco.com',
        subject: '🔥 URGENT: New Quote Request - Bridge Construction',
        textContent: `NEW QUOTE REQUEST

Name: John Smith
Email: john.engineer@construction.com
Phone: +234 801 234 5678
Service: Bridge Construction
Location: Lagos-Ibadan Expressway
Timeline: 18 months
Budget: ₦2.5 Billion

Project Details:
We need a comprehensive quote for constructing a 1.2km reinforced concrete bridge across the Ogun River. The project includes:

1. Structural engineering and design
2. Foundation work (pile foundations up to 30m depth)
3. Concrete superstructure with 4 spans
4. Safety barriers and lighting systems
5. Approach roads and drainage

This is a federal government project with strict quality requirements. Please provide detailed breakdown including materials, labor, equipment, and timeline.

Technical specifications:
- Load capacity: 40 tons per axle
- Width: 12 meters (dual carriageway)
- Seismic resistance: Zone 2 requirements
- Environmental compliance required`,
        htmlContent: '',
        receivedAt: new Date().toISOString(),
        read: false,
        replied: false,
      },
      {
        id: 'test-' + Date.now() + '-2',
        type: 'contact' as const,
        from: 'sarah.facilities@techhub.ng',
        to: process.env.MJ_RECEIVER_EMAIL || 'admin@symteco.com',
        subject: '📧 New Contact Form - Office Building Electrical System',
        textContent: `NEW CONTACT MESSAGE

Name: Sarah Wilson
Email: sarah.facilities@techhub.ng
Phone: +234 803 567 8901
Service: Electrical Installation

Message:
Hello Symteco Team,

I hope this message finds you well. I'm the Facilities Manager at TechHub Nigeria, and we're planning a major renovation of our 5-story office building in Victoria Island.

We need a reliable electrical contractor to handle:
- Complete rewiring of the building
- Installation of modern LED lighting systems
- Backup generator integration
- Fire safety and alarm systems
- Network cabling infrastructure

Could you please send us your company profile and arrange a site visit? We'd like to discuss the project scope and get a preliminary assessment.

Best regards,
Sarah Wilson
Facilities Manager
TechHub Nigeria`,
        htmlContent: '',
        receivedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        read: false,
        replied: false,
      },
      {
        id: 'test-' + Date.now() + '-3',
        type: 'quote' as const,
        from: 'ahmed.contractor@buildfast.ng',
        to: process.env.MJ_RECEIVER_EMAIL || 'admin@symteco.com',
        subject: '🔥 URGENT: New Quote Request - Industrial Complex Power System',
        textContent: `NEW QUOTE REQUEST

Name: Ahmed Bashir
Email: ahmed.contractor@buildfast.ng
Phone: +234 805 123 4567
Service: Industrial Electrical Installation
Location: Agbara Industrial Estate, Ogun State
Timeline: 12 months
Budget: ₦800 Million - ₦1.2 Billion

Project Details:
We're constructing a new manufacturing complex for automotive parts production and need a comprehensive power system installation quote.

Project Scope:
1. High voltage electrical infrastructure (33kV to 415V transformation)
2. Industrial control systems and automation
3. Heavy machinery power distribution
4. Emergency backup systems (3x 2MW generators)
5. Lightning protection and earthing systems
6. SCADA systems for monitoring and control

The facility will house:
- CNC machining centers (50+ units)
- Welding and fabrication equipment
- Paint booth with specialized ventilation
- Quality control laboratories
- Administrative offices

We need the quote to include design, supply, installation, testing, and commissioning. All work must comply with Nigerian electrical codes and international safety standards.

Please include warranty terms and maintenance packages in your proposal.`,
        htmlContent: '',
        receivedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        read: true,
        replied: false,
      },
      {
        id: 'test-' + Date.now() + '-4',
        type: 'contact' as const,
        from: 'info@greenbuilders.ng',
        to: process.env.MJ_RECEIVER_EMAIL || 'admin@symteco.com',
        subject: '📧 New Contact Form - Partnership Inquiry',
        textContent: `NEW CONTACT MESSAGE

Name: Green Builders Ltd
Email: info@greenbuilders.ng
Phone: +234 807 890 1234
Service: Partnership Opportunity

Message:
Dear Symteco Team,

We are Green Builders Limited, a construction company specializing in sustainable building solutions. We've been following your excellent work in electrical and mechanical engineering.

We're interested in exploring potential partnership opportunities for upcoming projects:

1. Residential estate development in Lekki (500 units)
2. Commercial shopping complex in Ibadan
3. Industrial warehouse projects across Southwest Nigeria

Your expertise in electrical systems would complement our construction capabilities perfectly. We believe this partnership could be mutually beneficial and help us deliver superior projects to our clients.

Would you be available for a meeting next week to discuss this further? We can arrange to meet at your office or ours, whichever is more convenient.

Looking forward to hearing from you.

Best regards,
Partnership Development Team
Green Builders Limited`,
        htmlContent: '',
        receivedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        read: true,
        replied: true,
      },
      {
        id: 'test-' + Date.now() + '-5',
        type: 'quote' as const,
        from: 'procurement@stategovt.ng',
        to: process.env.MJ_RECEIVER_EMAIL || 'admin@symteco.com',
        subject: '🔥 URGENT: New Quote Request - Public School Electrification Project',
        textContent: `NEW QUOTE REQUEST

Name: Ministry of Education Procurement
Email: procurement@stategovt.ng
Phone: +234 806 234 5678
Service: Electrical Installation
Location: Multiple locations across Lagos State
Timeline: 6 months
Budget: ₦500 Million

Project Details:
The Lagos State Ministry of Education is requesting quotes for the electrification of 25 newly constructed public schools across the state.

Each school requires:
1. Complete electrical installation from service entrance to final circuits
2. Solar power integration (50kW system per school)
3. Computer lab and library electrical infrastructure
4. Security lighting and camera systems
5. Water pump and borehole electrical connections

Schools are located in:
- Alimosho LGA (5 schools)
- Ikeja LGA (4 schools)
- Lagos Island (3 schools)
- Ikorodu LGA (6 schools)
- Badagry LGA (4 schools)
- Epe LGA (3 schools)

All work must be completed before the next academic session. Contractors must be registered with the Bureau of Public Procurement and have relevant COREN certifications.

Please submit your technical and financial proposals separately. The deadline for submission is in 3 weeks.`,
        htmlContent: '',
        receivedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        read: false,
        replied: false,
      }
    ];

    // Add all test messages to the store
    messageStore.push(...testMessages);

    console.log('Created test messages:', testMessages.map(m => ({ id: m.id, type: m.type, from: m.from })));

    return res.status(200).json({ 
      success: true, 
      message: 'Test messages created successfully',
      count: testMessages.length,
      messages: testMessages.map(m => ({ id: m.id, type: m.type, from: m.from, subject: m.subject }))
    });

  } catch (error) {
    console.error('Error creating test messages:', error);
    return res.status(500).json({ error: 'Failed to create test messages' });
  }
}
