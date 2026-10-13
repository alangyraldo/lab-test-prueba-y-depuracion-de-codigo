const UserController = require("./user-controller");
const User = require("./user");

// declaro la variable afuera para que todas las pruebas la puedan usar
let userController;

// antes de cada prueba creo un controlador nuevo y vací}io,
// asi una prueba no afecta a la siguiente
beforeEach(() => {
  userController = new UserController();
});

//  add con un usuario que no está en la lista
test('add: agrega un usuario que no estaba en la lista', () => {
  const user = new User(1234, "Santiago", "santiago@generation.org");
  // primero compruebo que el usuario todavía no está
  expect(userController.getUsers()).not.toContain(user);
  userController.add(user);
  // despues de agregarlo, ahora si debe estar
  expect(userController.getUsers()).toContain(user);
});

//remove con un usuario que no esta en la lista
test('remove: quitar un usuario que no está deja la lista igual', () => {
  const existente = new User(1, "Ana", "ana@generation.org");
  const ausente = new User(2, "Luis", "luis@generation.org");
  // solo agrego a ana luis nunca entra a la lista
  userController.add(existente);
  userController.remove(ausente);
  // la lista debe seguir teniendo solo a ana
  expect(userController.getUsers()).toEqual([existente]);
});

//findbyemail, caso en que el email si existe
test('findByEmail: devuelve el usuario con ese email', () => {
  const user = new User(1, "Ana", "ana@generation.org");
  userController.add(user);
  // debe devolver el mismo objeto que guarde
  expect(userController.findByEmail("ana@generation.org")).toBe(user);
});

// findbyemail, caso en que el email no existe
test('findByEmail: devuelve undefined si el email no existe', () => {
  // la lista esta vacia, así que no hay a quién encontrar
  expect(userController.findByEmail("nadie@generation.org")).toBeUndefined();
});

//findbyid, caso en que el id siexiste
test('findById: devuelve el usuario con ese id', () => {
  const user = new User(1, "Ana", "ana@generation.org");
  userController.add(user);
  expect(userController.findById(1)).toBe(user);
});

// findbyid, caso en que el id no existe
test('findById: devuelve undefined si el id no existe', () => {
  // no hay ningun usuario con id 99
  expect(userController.findById(99)).toBeUndefined();
});

