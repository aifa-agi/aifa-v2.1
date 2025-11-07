// @/app/api/lead-form/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for lead form data
const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email.'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = leadFormSchema.safeParse(body);

    // Return validation errors if schema validation fails
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
          message: 'Validation error. Please check your input.',
        },
        { status: 400 }
      );
    }

    const { name, phone, email } = validationResult.data;

    // Log form submission for testing purposes
    console.log('[MOCK EMAIL] Lead form submitted:', { name, phone, email });

    // Simulate successful email sending (mock response)
    console.log(
      `[MOCK EMAIL] Sent to: noreply@usauto.test | Reply to: ${email}`
    );

    // Return success response
    return NextResponse.json({
      success: true,
      message:
        'Your request has been sent successfully. We will contact you shortly.',
      mock: true,
    });
  } catch (error) {
    // Log unexpected errors
    console.error('[MOCK EMAIL] Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      },
      { status: 500 }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
