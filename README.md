## PROGRAMACIÓN BACKEND II

### Continuación del proyecto Backend I

> Última entrega

Para probar: [variables de entorno](https://drive.google.com/drive/folders/1qbyFEGuxyUYIFf79tzSrvzeB1R_A4ycv?usp=drive_link)<br>

- Se realiza separación por capas con cart.<br>
- Se realiza separación por capas con product.<br>
- Se agrega archivo .env.<br>
- Se utiliza un middleware de autorización para delimitar el acceso, los usuarios tienen acceso a products y los administradores tienen acceso a realtimeproducts.<br>
- Se aplica el patrón DTO para no enviar información sensible.<br>
- Se realiza separación por capas con user.<br>
- Se agrega patrón Singleton.<br>

> Primera entrega - Comisión 70415

Se crea el usuario Juan Perez con rol de administrador. Email: juan@perez.com - Contraseña: juan<br><br>
Adjunto las colecciones de Postman para probar.<br>
[postman_collection](https://drive.google.com/drive/folders/1qbyFEGuxyUYIFf79tzSrvzeB1R_A4ycv?usp=drive_link)<br>

- Cada vez que un usuario se registre, se crea un carrito que estará asociado con un Id a ese usuario registrado.<br>
- Cierre de sesión funcionando.<br>
- Se identifican los diferentes roles de los usuarios: user o admin.<br>
- Se realiza hasheo de la contraseña usando bcrypt, se utiliza estrategia de autenticación passport, jwt y cookies.<br>
- Inicio de sesión funcionando.<br>
- Registro de usuarios funcionando.

