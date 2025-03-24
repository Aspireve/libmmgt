import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaChevronRight } from "react-icons/fa";

// Define the type for breadcrumb items
interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function CustomBreadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="mt-5 ml-8">
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index < items.length - 1 ? (
              <>
                <BreadcrumbLink className="text-[#5C59E8] font-[500] text-base" href={item.href}>{item.label}</BreadcrumbLink>
                <BreadcrumbSeparator/>
              </>
            ) : (
              <BreadcrumbPage className="text-[#667085] font-[500] text-base">{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
    </div>
  );
}
