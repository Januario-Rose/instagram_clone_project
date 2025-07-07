import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/config"

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.public.file(file, {
      groupId: '75eafb09-d952-4f32-87aa-9218b6d2b2f2',
    });
    const fileUrl = 'https://'+process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL+'/files/'+uploadData.cid;
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}