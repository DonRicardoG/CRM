import {
  Form,
  useActionData,
  useNavigate,
  useLoaderData,
  redirect,
} from "react-router-dom";
import Forme from "../Components/Forme";
import Error from "../Components/Error";
import { editClient, getClient } from "../data/clients.js";

export async function loader({ params }) {
  const id = params.clientId;
  try {
    const client = await getClient(id);
    return client;
  } catch (error) {
    throw new Response("", {
      status: 404,
      statusText: "El Cliente no fue encontrado",
    });
  }
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get("email");

  const errors = [];
  if (Object.values(data).includes("")) {
    errors.push("Todos los campos son obligatorios");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(email)) {
    errors.push("Email no es valido");
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  await editClient(params.clientId, data);

  return redirect("/");
}

const EditClient = () => {
  const errors = useActionData();
  const navigate = useNavigate();
  const client = useLoaderData();
  return (
    <>
      <h1 className="font-black text-4xl">Editar Cliente</h1>
      <p className="mt-3 ">
        A continuación podrás cambiar los datos de tu cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mt-20 mx-auto px-5 py-10">
        {errors?.length &&
          errors.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Forme client={client} />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 hover:bg-blue-900 cursor-pointer p-3 uppercase font-bold text-white text-lg"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  );
};

export default EditClient;
