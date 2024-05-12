import { NextRequest, NextResponse } from 'next/server';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path'; 

// Define the directory where files will be saved
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

export async function POST(req: NextRequest) {
    try {
        // Generate a random file name or use the original file name from FormData if available
        // const filename = "uploaded_" + randomBytes(8).toString('hex')+ ".pdf";
        const data = await req.formData();
        const audioFile = data.get('theFiles');
        // Define the filepath by joining the upload directory and the filename
        // const filename = audioFile.name;
        // const filepath = join(UPLOAD_DIR, filename);
        // const extension = path.extname(filename);

        const originalName = audioFile.name;
        const extension = path.extname(originalName); // Not being used, could delete later
        const newFilename = originalName;  // Append extension to new filename

        const filepath = join(process.cwd(), 'public', 'uploads', newFilename);


        // Ensure the directory exists or create it
        await fs.promises.mkdir(UPLOAD_DIR, { recursive: true});

        // Create a writable stream to the file
        const writable = createWriteStream(filepath);

        // Use pipeline to handle the streams safely
        await pipeline(audioFile.stream(), writable);

        // Logging the file path to console for verification
        console.log('File uploaded to:', filepath);

        // Send response back to client
        return new NextResponse(JSON.stringify({ message: "File uploaded successfully", filepath: filepath }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Upload failed:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to upload file.' }), { status: 500 });
    }
}

export const config = {
    api: {
        bodyParser: false, // Important: Disable the default body parser to access the raw stream
    },
};
