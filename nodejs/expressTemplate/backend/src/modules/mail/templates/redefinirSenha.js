export default function RedefinirSenhaTemplate(resetUrl) {
	return `
      <div style="font-family: Arial; max-width: 600px;">
        <h2>Redefinição de senha</h2>
        <p>Você solicitou redefinição de senha.</p>
        <p>Clique no botão abaixo:</p>
        <a href="${resetUrl}" 
           style="background: #000; color: #fff; padding: 10px 15px; text-decoration: none;">
           Redefinir senha
        </a>
        <p>Esse link expira em 15 minutos.</p>
      </div>
    `;
}
