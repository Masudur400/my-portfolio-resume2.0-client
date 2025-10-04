import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Assuming you have these icons or similar ones available
import { School, Calendar } from "lucide-react"; 

 
const EducationalQualifications = () => {
  const qualifications = [
    {
      title: "Secondary School Certificate",
      institution: "Aftab Uddin School & College",
      year: "2017",
      description: "Successfully completed Secondary education.",
    },
    {
      title: "Higher Secondary Certificate",
      institution: "Aftab Uddin School & College",
      year: "2019 - 2020",
      description: "Successfully completed Higher Secondary education.",
    },
    {
      title: "Bachelor of Business Administration",
      institution: "Mohammadpur Kendriya College",
      year: "2021 - Present",
      description: "Department of Management. Currently pursuing my degree.",
    },
  ];

  return (
    <div className="my-16">
      <h2 className="lg:text-4xl md:text-3xl text-2xl font-medium my-10 ">
        Educational Qualifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qualifications.map((qual, index) => ( 
          <Card key={index} data-aos="zoom-in" className="hover:scale-105 transition-transform duration-300 ">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl  font-medium  ">
                {qual.title}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {qual.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                <School className="w-5 h-5 text-indigo-500" />
                <span>{qual.institution}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span>Year: {qual.year}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EducationalQualifications;