import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';
dotenv.config();

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
    role: string;
    basics: string[];
    days: string[];
    times: string[];
    phone: string;
    type: string;
  };

  if (req.method === 'POST') {
    const body = req.body as ReqBody;
    try {
      const client = await authenticate();
      const sheets = google.sheets({ version: 'v4', auth: client });

      const basics = body.basics.join(', ');
      const days = body.days.join(', ');
      const times = body.times.join(', ');

      const googleSheetData = [body.name, body.school, body.role, basics, days, times, body.type, body.phone];
      const googleSheetRequest = {
        spreadsheetId: process.env.SHEET_ID,
        range: 'Sheet1',
        valueInputOption: 'RAW',
        resource: { values: [googleSheetData] },
      };
      const response = await sheets.spreadsheets.values.append(googleSheetRequest);

      const iftttData = {
        Nombre: body.name,
        Colegio: body.school,
        Nivel: body.role,
        Materias: body.basics,
        Dias: body.days,
        Horas: body.times,
        Tipo: body.type,
        Telefono: body.phone,
      };
      const iftttResponse = await fetch('https://maker.ifttt.com/trigger/lila/json/with/key/b2Y4VhUq8WCp1CaaK-D91t', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(iftttData),
      });

      if (response.status === 200 && iftttResponse.ok) {
        res.status(200).json({ message: "Data processed and sent successfully to both Google Sheets and IFTTT." });
      } else {
        // Possible improvement: Add more specific error messages depending on which request failed
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
