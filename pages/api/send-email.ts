import dotenv from 'dotenv';
dotenv.config();
import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns';

let jwtClient: any;

async function authenticate() {
  if (!jwtClient) {
    const private_key = process.env.PRIVATE_KEY!.replace(/\\n/g, '\n');
    jwtClient = new google.auth.JWT(
      process.env.CLIENT_EMAIL,
      undefined,
      private_key,
      ['https://www.googleapis.com/auth/spreadsheets'],
    );
  }
  return jwtClient;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  type ReqBody = {
    name: string;
    school: string;
    email: string;
    phone: string;
    basics: string[];
    intermediates: string[];
    advanceds: string[];
    zones: string[];
  };

  if (req.method === 'POST') {
    const body = req.body as ReqBody;
    try {
      const client = await authenticate();
      const sheets = google.sheets({ version: 'v4', auth: client });

      const basics = body.basics?.join(', ') ?? '';
      const intermediates = body.intermediates?.join(', ') ?? '';
      const advanceds = body.advanceds?.join(', ') ?? '';
      const zones = body.zones?.join(', ') ?? 'No Aplica';
      const submittedDate = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

      const googleSheetData = [body.name, body.school, body.email, body.phone, basics, intermediates, advanceds, zones, submittedDate ];
      const googleSheetRequest = {
        spreadsheetId: process.env.SHEET_ID,
        range: 'Materias_Nuevo',
        valueInputOption: 'RAW',
        resource: { values: [googleSheetData] },
      };
      const response = await sheets.spreadsheets.values.append(googleSheetRequest);

      if (response.status === 200) {
        res.status(200).json({ message: "Data processed and sent successfully to both Google Sheets and IFTTT." });
      } else {
        throw new Error('An error occurred while processing and sending the data.');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while processing and sending the data.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed. Please send a POST request.' });
  }
}
