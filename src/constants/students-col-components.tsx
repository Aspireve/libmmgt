import { StudentFromDatabase } from "@/types/student";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Images from "@/images";
import useDisclosure from "@/hooks/disclosure-hook";
import DeleteStudentModal from "@/components/students/delete-student-modal";
import { Button } from "@/components/ui/button";

export const StudentIDCell = ({
  student,
}: {
  student: Partial<StudentFromDatabase>;
}) => {
  const router = useRouter();
  return (
    <div
      className="relative group cursor-pointer font-bold text-[#1E40AF]"
      onClick={() =>
        router.push(
          `/student-page/student-profile?student_id=${student.student_id}`
        )
      }
    >
      {student.student_id}
      {/* <div
        className=" absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
          after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800"
      >
        Student Profile
      </div> */}
    </div>
  );
};

// Component for Name Column
export const StudentNameCell = ({
  student,
}: {
  student: Partial<StudentFromDatabase>;
}) => {
  return (
    <div className="relative group">
      {student.student_name}
      {/* <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
          after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800"
      >
        Student Profile
      </div> */}
    </div>
  );
};

export const StudentActions = ({
  student,
  refetch,
}: {
  student: Partial<StudentFromDatabase>;
  refetch: () => void;
}) => {
  const router = useRouter();
  const { isOpen, close, open } = useDisclosure();
  return (
    <div className="flex gap-2 ml-10">
      <Button
        className="p-0 shadow-none"
        onClick={() => {
          router.push(`/student-page/EditStudent?id=${student.student_uuid}`);
        }}
        aria-label="Edit student"
      >
        <Image src={Images.EditButton} alt="Edit" height={20} width={20} />
      </Button>
      <Button
        onClick={open}
        className="p-0 shadow-none"
        aria-label="Delete student"
      >
        <Image src={Images.DeleteButton} alt="Delete" height={20} width={20} />
      </Button>
      <DeleteStudentModal
        data={[student]}
        close={close}
        isOpen={isOpen}
        refetch={refetch}
      />
    </div>
  );
};
