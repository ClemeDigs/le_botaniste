import {useLoaderData} from '@remix-run/react';

export async function loader({context}) {
  const data = await context.storefront.query(EMPLOYEES_QUERY);
  return {employees: data.metaobjects.nodes};
}

export default function OurEmployees() {
  const {employees} = useLoaderData();

  return (
    <div className="p-8 ">
      <h1>Nos employés</h1>
      <div className="grid grid-cols-3 gap-3">
        {employees.map(
          ({
            id,
            profilepicture,
            firstname,
            lastname,
            email,
            age,
            position,
            salary,
          }) => (
            <div key={id} className="p-3 border-2 border-dark-green rounded-lg">
              <img
                src={profilepicture.value}
                alt={firstname.value + ' ' + lastname.value}
              />
              <h2>
                {firstname.value} {lastname.value}
              </h2>
              <p>Contact: {email.value}</p>
              <p>Age: {age.value} ans</p>
              <p>Position: {position.value}</p>
              <p>Salaire: {salary.value}$</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

const EMPLOYEES_QUERY = `#graphql
  query employees {
    metaobjects(first: 250, type: "Employee") {
      nodes {
        id
        firstname: field(key: "first_name") {
          value
        }
        lastname: field(key: "last_name") {
          value
        }
        profilepicture: field(key: "profile_picture") {
          value
        }
        age: field(key: "age") {
          value
        }
        position: field(key: "position") {
          value
        }
        salary: field(key: "salary") {
          value
        }
        email: field(key: "email") {
          value
        }
      }
    }
  }
`;
