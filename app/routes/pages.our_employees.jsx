import {useLoaderData} from '@remix-run/react';
import {LuMail} from 'react-icons/lu';
import PageTitle from '~/components/PageTitle';

export async function loader({context}) {
  const data = await context.storefront.query(EMPLOYEES_QUERY);
  return {employees: data.metaobjects.nodes};
}

export default function OurEmployees() {
  const {employees} = useLoaderData();

  return (
    <div>
      <PageTitle title="Nos employés"></PageTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8 max-w-[2000px] m-auto">
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
              className="rounded-lg border-4 border-dark-green bg-dark-green flex flex-col justify-start"
            >
              <img
                src={photo?.reference?.image?.url || ''}
                alt={firstname.value + ' ' + lastname.value}
                className={`rounded-t-lg border-4 border-dark-green max-h-[700px] w-full object-cover ${
                  photo?.reference?.image?.url ? '' : 'hidden'
                }`}
              />

              <div className=" test text-white p-4">
                <h3>
                  {firstname.value} {lastname.value.toUpperCase()}
                </h3>
                <h6>{position.value}</h6>
                <div className="flex gap-1 items-center pt-4">
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
