import { useLoaderData } from "react-router-dom";
import Client from "../Components/Client";
import { getClients } from "../data/clients.js";

export function loader() {
  const clients = getClients();
  return clients;
}

const Index = () => {
  const clients = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl"> Clientes</h1>
      <p className="mt-3 ">Administra tus Clientes</p>

      {clients.length ? (
        <table className="w-full bg-white mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Clients</th>
              <th className="p-2">Contacts</th>
              <th className="p-2">Accions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, i) => (
              <Client key={i} client={client} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">There is no clients yet.</p>
      )}
    </>
  );
};

export default Index;
