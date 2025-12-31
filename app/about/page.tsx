export default function About() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          About
        </h1>
        <p className="text-sm sm:text-base text-muted">
          Learn more about Shame App.
        </p>
      </header>
      <article className="bg-surface border border-border rounded p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
          About Shame App
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Shame App is a web application designed to help you track and manage promises.
          </p>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            More information about the app will be displayed here.
          </p>
        </div>
      </article>
    </div>
  )
}

