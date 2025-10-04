import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Bike, Cpu, Mountain, Volleyball } from 'lucide-react';

const Hobbies = () => {
    return (
        <div>
            <section className="my-10">
      <h2 className="lg:text-4xl md:text-3xl text-2xl font-medium my-10">Hobbies & Interests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card className="hover:shadow-lg hover:scale-105 transition-transform duration-300 bg-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volleyball className="w-5 h-5 text-orange-600" />
              Sports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Play Football, Badminton & Cricket to stay active and energized.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-transform duration-300 bg-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bike className="w-5 h-5 text-blue-600" />
              Biking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Love biking as a way to relax and explore surroundings.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-transform duration-300 bg-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mountain className="w-5 h-5 text-green-600" />
              Touring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Enjoy touring new places, experiencing nature & adventure.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-transform duration-300 bg-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-600" />
              Explore Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Passionate about discovering and learning new technologies.</p>
          </CardContent>
        </Card>

      </div>
    </section>
        </div>
    );
};

export default Hobbies;