import type { NextApiRequest, NextApiResponse } from 'next'

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.error('GOOGLE_APPS_SCRIPT_URL is not defined');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    console.log('Submitting to Google Apps Script:', GOOGLE_APPS_SCRIPT_URL);
    console.log('Form data:', req.body);

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    console.log('Google Apps Script response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Apps Script error response:', errorText);
      throw new Error(`Failed to submit to Google Apps Script: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Google Apps Script result:', result);

    if (result.result === 'success') {
      res.status(200).json({ message: 'Form submitted successfully' });
    } else {
      throw new Error('Failed to submit form to Google Sheets');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Error submitting form' });
  }
}