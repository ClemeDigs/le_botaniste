import {useLoaderData} from '@remix-run/react';
import {LuMail} from 'react-icons/lu';

export async function loader({context}) {
  const data = await context.storefront.query(EMPLOYEES_QUERY);
  return {employees: data.metaobjects.nodes};
}

export default function OurEmployees() {
  const {employees} = useLoaderData();

  return (
    <div className="p-8 flex flex-col max-w-[2000px] m-auto">
      <h1 className="text-dark-green">Nos employés</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
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
            photo,
          }) => (
            <div
              key={id}
              className="rounded-lg border-4 border-dark-green bg-dark-green flex flex-col gap-2"
            >
              <img
                src={photo.reference.image.url}
                alt={firstname.value + ' ' + lastname.value}
                className="rounded-t-lg border-4 border-dark-green max-h-[500px] md:max-h-[400px] w-full object-cover object-center lg:object-cover
                "
              />
              <div className="text-white flex flex-col p-4">
                <h3>
                  {firstname.value} {lastname.value.toUpperCase()}
                </h3>
                <h6>{position.value}</h6>
                <div className="flex gap-3 items-center pt-4">
                  <LuMail className="text-2xl" />
                  <p>{email.value}</p>
                </div>
              </div>
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
        photo: field(key: "photo") {
          reference {
          ... on MediaImage {
            id
            image {
              url
            }
          }
        }
        }
      }
    }
  }
`;
