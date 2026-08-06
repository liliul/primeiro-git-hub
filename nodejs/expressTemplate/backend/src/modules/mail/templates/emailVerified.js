export default function EmailVerifiedTemplate(verifiedUrl) {
    return `
      <div style="font-family: Arial; max-width: 600px;">
        <h2>Confirmar seu E-mail.</h2>
        <p>Verificando email.</p>
        <p>Clique no botão abaixo:</p>
        <a href="${verifiedUrl}" 
           style="background: #000; color: #fff; padding: 10px 15px; text-decoration: none;">
           verificar
        </a>
        <p>Esse link expira em 15 minutos.</p>
      </div>
    `;
}