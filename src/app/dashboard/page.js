import Headings from "../../Components/Headings/Headings";
import { Suspense } from "react";
import Loader from "../../Components/Loader/Loader"
import Department from "../../models/Faculty/Department";
import Program from "../../models/Faculty/Program";
import Link from "next/link";
import connect from "../../utils/connect";

import OfficeStaff from "../../models/administration/OfficeStaff";
import MeritList from "models/meritlist/MeritList";
import Download from "../../models/downloads/Downloads";
import Tender from "../../models/tender/Tender";
import News from "../../models/news/News";
import Category from "../../models/news/Category";
import { Hash } from "lucide-react";
import { faculties, aboutMcut,administration,admissionF,campusLifeF } from "../../utils/navSlugs";

const departments = async () => {
  await connect()
  try {
    const id = await Department.find().select('_id')
    if (id) {
      return {
        success: true,
        data: id
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
const programs = async () => {
  await connect()
  try {
    const id = await Program.find().select('_id')
    if (id) {
      return {
        success: true,
        data: id
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
const staff = async () => {
  await connect()
  try {
    const id = await Staff.find().select('_id')
    if (id) {
      return {
        success: true,
        data: id
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
const adminStaff = async () => {
  await connect()
  try {
    const id = await OfficeStaff.find().select('_id')
    if (id) {
      return {
        success: true,
        data: id
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
const meritLists = async () => {
  await connect()
  try {
    const id = await MeritList.find().select('_id')
    if (id) {
      return {
        success: true,
        data: id
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
const newsF = async () => {
  await connect()
  try {
    const id = await News.find().select('_id')
    if (id) {
      return {
        success: true,
        data: id
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
const downloads = async () => {
  await connect()
  try {
    const id = await Download.find().select('_id')
    if (id) {
      return {
        success: true,
        data: id
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
const tenders = async () => {
  await connect()
  try {
    const id = await Tender.find().select('_id')
    if (id) {
      return {
        success: true,
        data: id
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

const categories = async () => {
  await connect()
  try {
    const id = await Category.find().select('_id')
    if (id) {
      return {
        success: true,
        data: id
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

const DashboardPage = async () => {

  const newfaculties = await faculties()
  const newdepartments = await departments()
  const newprograms = await programs()
  const newstaff = await staff()
  const admin = await administration()
  const adminStf = await adminStaff()
  const mcut = await aboutMcut()
  const newAdmissions = await admissionF()
  const newMeritLists = await meritLists()
  const newCampusLife = await campusLifeF()
  const newDownloads = await downloads()
  const newTender = await tenders()
  const newNews = await newsF()
  const newCategory = await categories()

  return (
    <div className="w-full h-auto p-4">
      <div className="w-full flex items-center mb-7">
        <Headings title={'Dashboard'} des={'MCUT Website Admin Dashboard'} />
      </div>
      <div className="w-full h-auto">
        <section className="mt-4">

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <Suspense fallback={<Loader />}>
              {newfaculties?.success &&
                <Link href={'/dashboard/faculties'} className=" flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Faculties</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{newfaculties?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {newdepartments?.success &&
                <Link href={'/dashboard/departments'} className=" flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Departments</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{newdepartments?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {newprograms?.success &&
                <Link href={'/dashboard/programs'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Programs</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{newprograms?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {newstaff?.success &&
                <Link href={'/dashboard/staff'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Staff</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{newstaff?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {admin?.success &&
                <Link href={'/dashboard/administration'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Administration</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{admin?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {adminStf?.success &&
                <Link href={'/dashboard/adminstaff'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Administration Staff</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{adminStf?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {mcut?.success &&
                <Link href={'/dashboard/aboutmcut'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">About MCUT</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{mcut?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {newAdmissions?.success &&
                <Link href={'/dashboard/admission'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Admission</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{newAdmissions?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {newMeritLists?.success &&
                <Link href={'/dashboard/meritlists'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Merit Lists</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{newMeritLists?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {newCampusLife?.success &&
                <Link href={'/dashboard/campuslife'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Campus Life</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{newCampusLife?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {newDownloads?.success &&
                <Link href={'/dashboard/downloads'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Downloads</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{newDownloads?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {newTender?.success &&
                <Link href={'/dashboard/tender'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Tenders</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{newTender?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {newNews?.success &&
                <Link href={'/dashboard/news'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">News</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{newNews?.data?.length}</p>
                </Link>
              }
            </Suspense>

            <Suspense fallback={<Loader />}>
              {newCategory?.success &&
                <Link href={'/dashboard/category'} className="flex flex-col gap-y-3 items-center justify-center w-full h-full min-h-32 text-black bg-gradient-to-b from-green-200 from-50% to-accent to-50%  rounded-xl">
                  <h3 className="text-foreground/80">Categories</h3>
                  <p className="text-3xl text-background flex items-center gap-1"><Hash />{newCategory?.data?.length}</p>
                </Link>
              }
            </Suspense>

          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
