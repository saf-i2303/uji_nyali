"use client";

import Image from "next/image";

export interface AvatarCirclesProps {
  people: {
    name: string;
    image: string;
  }[];
  numPeople?: number;
  className?: string;
}

export function AvatarCircles({
  people,
  numPeople = 3,
  className = "",
}: AvatarCirclesProps) {
  const visiblePeople = people.slice(0, numPeople);

  return (
    <div className={`flex items-center -space-x-3 ${className}`}>
      {visiblePeople.map((person, index) => (
        <div
          key={index}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md"
        >
          <Image
            src={person.image}
            width={40}
            height={40}
            alt={person.name}
            className="object-cover w-full h-full"
          />
        </div>
      ))}

      {people.length > numPeople && (
        <div className="w-10 h-10 rounded-full bg-[#281A14] flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-md">
          +{people.length - numPeople}
        </div>
      )}
    </div>
  );
}