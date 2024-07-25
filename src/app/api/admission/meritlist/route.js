import Program from "../../../../models/Faculty/Program";
import MeritList from "../../../../models/meritlist/MeritList";
import connect from "../../../../utils/connect";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connect();
  try {
    const data = await MeritList.find({}).populate({
      path: 'program',
      model: 'Program',
      select: 'name'
    });
    return NextResponse.json({
      success: true,
      data
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}


export async function POST(request) {
  await connect();
  const { program, pdfUrl } = await request.json();
  try {
    const newEntry = new MeritList({ program, pdfUrl });
    await newEntry.save();
    if (newEntry) {
      await Program.updateOne({ _id: program }, { $push: { meritLists: newEntry._id } })
      return NextResponse.json({
        success: true,
        message: "Successfully Created"
      })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}


export async function PATCH(request) {
  await connect();

  const { program, pdfUrl, id } = await request.json();

  try {
    await Program.updateMany({ meritLists: id }, { $pull: { meritLists: id } })
    await Program.updateMany({ _id: program }, { $push: { meritLists: id } })

    await MeritList.findByIdAndUpdate(id,{ program, pdfUrl },{ new: true });

    return NextResponse.json({
      success: true,
      message: 'Successfully Updated'
    })
  } catch (error) {
    NextResponse.json({ success: false, error: error.message });
  }
}
