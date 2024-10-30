import {employees} from '~/data/employees';
import {CardEmployee} from '~/components/CardEmployee';
import {Button} from '~/components/Button';
import {useState} from 'react';

export default function OurEmployees() {
  const [counter, setCounter] = useState(1);

  function incCounter() {
    setCounter(counter + 1);
  }

  return (
    <div className="flex flex-col gap-8 pt-8 bg-orange-50">
      <h2 className="text-center">Our Employees</h2>
      <p className="text-center">
        Meet the dedicated team at Le Botaniste, passionate about helping you
        bring the beauty of plants into your home.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {employees.map((employe) => (
          <>
            <CardEmployee
              key={employe.id}
              profilePicture={employe.profilePicture}
              firstName={employe.firstName}
              lastName={employe.lastName}
              position={employe.position}
              age={employe.age}
              email={employe.email}
              salary={employe.salary}
            />
          </>
        ))}
      </div>

      <div>
        <Button content={counter} onClick={incCounter}></Button>
      </div>
    </div>
  );
}
