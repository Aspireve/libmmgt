import { StudentFromDatabase } from "@/types/student";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Images from "@/images";
import useDisclosure from "@/hooks/disclosure-hook";
import DeleteStudentModal from "@/components/students/delete-student-modal";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Edit02Icon } from "@hugeicons/core-free-icons";
import TooltipToggle from "@/components/custom/tooltip-toggle";

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
          `/student-page/student-profile?student_id=${student.studentUuid}`
        )
      }
    >
      {student.barCode}
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
    <div className="flex gap-2 items-center">
      <TooltipToggle content="Edit Student">
        <HugeiconsIcon
          icon={Edit02Icon}
          size={24}
          color="#3957B8"
          strokeWidth={1.5}
          className="p-0 shadow-none cursor-pointer  "
          onClick={() => {
            router.push(
              `/student-page/EditStudent?student_id=${student.barCode}`
            );
          }}
          aria-label="Edit student"
        />
      </TooltipToggle>
      <TooltipToggle content="Delete">
        <HugeiconsIcon
          icon={Delete02Icon}
          size={24}
          color="#3957B8"
          strokeWidth={1.5}
          className="p-0 shadow-none cursor-pointer "
          onClick={open}
        />
      </TooltipToggle>

      <DeleteStudentModal
        data={[student]}
        close={close}
        isOpen={isOpen}
        refetch={refetch}
      />
    </div>
  );
};
