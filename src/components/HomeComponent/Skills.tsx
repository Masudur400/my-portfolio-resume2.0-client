"use client";
import { Card } from "../ui/card";
import { BsFillInboxesFill } from "react-icons/bs";
import { LuCodeXml } from "react-icons/lu";
import { HiPaintBrush } from "react-icons/hi2";
import {
  Cloudinary,
  CSS3,
  ExpressJsLight,
  Firebase,
  Git,
  GitHubLight,
  HTML5,
  JavaScript,
  MongoDB,
  NextJs,
  NodeJs,
  NPM,
  PostgreSQL,
  Prisma,
  React,
  Redux,
  TailwindCSS,
  TypeScript,
} from "developer-icons";
import { JSX, useState } from "react";

interface SkillItem {
  id: number;
  image: JSX.Element;
  title: string;
}

const Skills = () => {
  const cardData: SkillItem[] = [
    { id: 1, image: <HTML5 />, title: "HTML" },
    { id: 2, image: <CSS3 />, title: "CSS3" },
    { id: 3, image: <TailwindCSS />, title: "TailwindCSS" },
    { id: 4, image: <JavaScript />, title: "JavaScript" },
    { id: 5, image: <TypeScript />, title: "TypeScript" },
    { id: 6, image: <React />, title: "React" },
    { id: 7, image: <NextJs />, title: "NextJs" },
    { id: 8, image: <Redux />, title: "Redux" },
    { id: 9, image: <NodeJs />, title: "NodeJs" },
    { id: 10, image: <ExpressJsLight />, title: "ExpressJs" },
    { id: 11, image: <Prisma />, title: "Prisma" },
    { id: 12, image: <MongoDB />, title: "MongoDB" },
    { id: 13, image: <PostgreSQL />, title: "PostgreSQL" },
    { id: 14, image: <Firebase />, title: "Firebase" },
    { id: 15, image: <Cloudinary />, title: "Cloudinary" },
    { id: 16, image: <Git />, title: "Git" },
    { id: 17, image: <GitHubLight />, title: "GitHub" },
    { id: 18, image: <NPM />, title: "NPM" },
  ];

  const [gridItems, setGridItems] = useState<SkillItem[]>(cardData);
  const [draggedItem, setDraggedItem] = useState<SkillItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<SkillItem | null>(null);

  const handleDragStart = (item: SkillItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, item: SkillItem) => {
    e.preventDefault();
    setHoveredItem(item);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropItem: SkillItem) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newGrid = gridItems.map((item) => {
      if (item.id === dropItem.id) return draggedItem;
      if (item.id === draggedItem.id) return dropItem;
      return item;
    });

    setGridItems(newGrid);
    setDraggedItem(null);
    setHoveredItem(null);
  };

  return (
    <div>
      <p className="lg:text-4xl md:text-3xl text-2xl font-medium my-10">
        Technical Expertise
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="px-5 py-6 group hover:scale-105 transition-transform duration-300 bg-white/5 backdrop-blur-sm rounded-xl shadow-lg shadow-indigo-800">
          <p className="text-4xl mb-2 text-sky-600">
            <LuCodeXml />
          </p>
          <p className="text-xl font-medium group-hover:text-sky-500">Frontend Development</p>
          <p className="text-gray-400 text-sm mt-2">
            Building interactive and responsive user interfaces using modern web technologies.
          </p>
        </Card>


        <Card className="px-5 py-6 group hover:scale-105 transition-transform duration-300 bg-white/5 backdrop-blur-sm rounded-xl shadow-lg shadow-indigo-800">
          <p className="text-4xl mb-2 text-purple-500">
            <BsFillInboxesFill />
          </p>
          <p className="text-xl font-medium group-hover:text-purple-500">Backend Development</p>
          <p className="text-gray-400 text-sm mt-2">
            Designing secure and scalable server-side logic, databases, and APIs.
          </p>
        </Card>

        <Card className="px-5 py-6 group hover:scale-105 transition-transform duration-300 bg-white/5 backdrop-blur-sm rounded-xl shadow-lg shadow-indigo-800">
          <p className="text-4xl mb-2 text-pink-400">
            <HiPaintBrush />
          </p>
          <p className="text-xl font-medium group-hover:text-pink-400">UI/UX Design</p>
          <p className="text-gray-400 text-sm mt-2">
            Crafting visually appealing and user-friendly designs for better experiences.
          </p>
        </Card>
      </div>


      <div> 
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4   mx-auto my-16">
          {gridItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              onDragOver={(e) => handleDragOver(e, item)}
              onDrop={(e) => handleDrop(e, item)}
              onDragLeave={() => setHoveredItem(null)}
              className={`w-fit mx-auto md:px-4 md:py-2 px-6 py-2 border-2 border-gray-600 hover:shadow-indigo-800 hover:shadow-md rounded text-center cursor-move ${item.id === draggedItem?.id && "bg-blue-100 opacity-30"
                } ${item.id === hoveredItem?.id
                  ? "border-dashed border-2 border-blue-500"
                  : "border-gray-100"
                }`}
            >
              <p className="md:w-20">{item.image}</p>
              <p className="text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
