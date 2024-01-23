import { useNavigate, Form, redirect } from "react-router-dom";
import { destroyClient } from "../data/clients";

export async function action({ params }) {
  await destroyClient(params.clientId);

  return redirect("/");
}
const Client = ({ client }) => {
  const { name, email, company, phone, id } = client;

  const navigate = useNavigate();
  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{name}</p>
        <p>{company}</p>
      </td>
      <td className="p-6 space-y-2">
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">email: </span>
          {email}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">phone: </span>
          {phone}
        </p>
      </td>
      <td className="p-6 flex gap-3">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
          onClick={() => navigate(`/clients/${id}/edit`)}
        >
          Editar
        </button>

        <Form
          method="post"
          action={`/clients/${id}/destroy`}
          onSubmit={(e) => {
            if (!confirm("¿Deseas eleminiar el registro?")) {
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default Client;
