export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="py-2 px-4 rounded-md no-underline bg-anomalie-cyan text-anomalie-dark-blue hover:bg-anomalie-dark-blue hover:text-anomalie-cyan">
        Logout
      </button>
    </form>
  )
}
