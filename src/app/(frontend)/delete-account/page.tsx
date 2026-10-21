
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Delete Account | Radio Huns',
  description:
    'Learn how to delete your Radio Huns account and request deletion of associated personal data.',
}

const deletionSteps = [
  'Open the Radio Huns mobile application.',
  'Navigate to the Profile section.',
  'Select the Delete Account option.',
  'Follow the on-screen instructions and confirm your request.',
]

const deletedData = [
  'Account profile information, such as your name and email address.',
  'Authentication and account information associated with your Radio Huns account.',
  'Other personal information linked to your account that is eligible for deletion.',
]

const retainedData = [
  'Information that must be retained to comply with applicable legal obligations.',
  'Limited records necessary to address security incidents, prevent fraud or abuse, resolve disputes, or establish and defend legal claims.',
]

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#252B36]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F04B1F] text-[#F7F1E8]">
        <div className="mx-auto max-w-350 px-6 pb-20 pt-28 sm:px-8 md:px-12 md:pb-28 md:pt-36 lg:px-16">
          <div className="mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-[#F9B855]">
            <span className="h-px w-10 bg-[#F9B855]" />
            Account Management
          </div>

          <h1 className="max-w-5xl font-serif text-[3.5rem] font-normal leading-[0.92] tracking-[-0.05em] sm:text-[5rem] md:text-[7rem] lg:text-[9rem]">
            Delete
            <span className="block text-[#F9B855]">Account</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-[#F7F1E8]/85 md:text-lg md:leading-8">
            Your account is yours to manage. Follow the instructions below to
            delete your Radio Huns account and its associated personal data.
          </p>
        </div>

        {/* Decorative Circle */}
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-[40px] border-[#F9B855]/20 sm:h-80 sm:w-80" />
      </section>

      {/* Introduction */}
      <section className="border-b border-[#252B36]/10">
        <div className="mx-auto max-w-300 px-6 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16">
          <p className="max-w-3xl text-lg leading-8 text-[#252B36]/70 md:text-xl md:leading-9">
            Radio Huns allows users to request account deletion directly from
            the mobile application. You do not need to visit this website or
            create a separate request if you can complete the deletion process
            within the app.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 md:px-12 md:py-20 lg:px-16">
          <div className="grid gap-8 border-b border-[#252B36]/10 py-12 md:grid-cols-[280px_1fr] md:gap-16 md:py-16 lg:gap-24">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#F04B1F]">
                01 / Instructions
              </p>
              <h2 className="mt-4 max-w-[280px] font-serif text-3xl font-normal leading-tight tracking-[-0.02em] md:text-4xl">
                How to delete your account
              </h2>
            </div>

            <div className="max-w-3xl">
              <p className="mb-6 text-[15px] leading-7 text-[#252B36]/75 md:text-base md:leading-8">
                To delete your Radio Huns account, follow these steps:
              </p>

              <ol className="space-y-5">
                {deletionSteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F04B1F]/10 text-sm font-semibold text-[#F04B1F]">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-[15px] leading-7 text-[#252B36]/75 md:text-base">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-7 text-[15px] leading-7 text-[#252B36]/75 md:text-base">
                Account deletion is intended to remove your account and
                associated personal data, subject to applicable legal
                requirements and the retention exceptions described below.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-b border-[#252B36]/10 py-12 md:grid-cols-[280px_1fr] md:gap-16 md:py-16 lg:gap-24">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#F04B1F]">
                02 / Data Removal
              </p>
              <h2 className="mt-4 max-w-[280px] font-serif text-3xl font-normal leading-tight tracking-[-0.02em] md:text-4xl">
                What data is deleted?
              </h2>
            </div>

            <div className="max-w-3xl">
              <p className="mb-6 text-[15px] leading-7 text-[#252B36]/75 md:text-base md:leading-8">
                When your account deletion is completed, the following
                categories of personal data associated with your account are
                intended to be deleted, where applicable:
              </p>

              <ul className="space-y-4">
                {deletedData.map((item) => (
                  <li key={item} className="relative pl-7 text-[15px] leading-7 text-[#252B36]/75 md:text-base">
                    <span className="absolute left-0 top-[0.7rem] h-1.5 w-1.5 rounded-full bg-[#F04B1F]" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[15px] leading-7 text-[#252B36]/75 md:text-base">
                Radio Huns does not need to retain your active account profile
                merely because you previously registered for the service.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-b border-[#252B36]/10 py-12 md:grid-cols-[280px_1fr] md:gap-16 md:py-16 lg:gap-24">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#F04B1F]">
                03 / Data Retention
              </p>
              <h2 className="mt-4 max-w-[280px] font-serif text-3xl font-normal leading-tight tracking-[-0.02em] md:text-4xl">
                What data may be retained?
              </h2>
            </div>

            <div className="max-w-3xl">
              <p className="mb-6 text-[15px] leading-7 text-[#252B36]/75 md:text-base md:leading-8">
                Certain limited information may be retained when necessary and
                permitted for the following purposes:
              </p>

              <ul className="space-y-4">
                {retainedData.map((item) => (
                  <li key={item} className="relative pl-7 text-[15px] leading-7 text-[#252B36]/75 md:text-base">
                    <span className="absolute left-0 top-[0.7rem] h-1.5 w-1.5 rounded-full bg-[#F04B1F]" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[15px] leading-7 text-[#252B36]/75 md:text-base md:leading-8">
                Any retained information will be kept only for as long as
                necessary for the applicable legal, security, or other
                permitted purpose and will be deleted when it is no longer
                required. Retained information will not be used to restore a
                deleted account.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-b border-[#252B36]/10 py-12 md:grid-cols-[280px_1fr] md:gap-16 md:py-16 lg:gap-24">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#F04B1F]">
                04 / Need Help?
              </p>
              <h2 className="mt-4 max-w-[280px] font-serif text-3xl font-normal leading-tight tracking-[-0.02em] md:text-4xl">
                Having trouble?
              </h2>
            </div>

            <div className="max-w-3xl">
              <p className="text-[15px] leading-7 text-[#252B36]/75 md:text-base md:leading-8">
                If you cannot access your account or the in-app deletion
                option does not work, please visit our website and use the
                available contact options for assistance with your deletion
                request.
              </p>

              <Link
                href="/contact"
                className="group mt-7 inline-flex items-center gap-3 rounded-full border border-[#F04B1F] px-6 py-3 text-sm font-semibold text-[#F04B1F] transition-all duration-300 hover:bg-[#F04B1F] hover:text-[#F7F1E8]"
              >
                Contact Radio Huns
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Related Pages */}
          <div className="mt-10 flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#252B36]/50">
                Related legal information
              </p>
              <p className="mt-1 text-base text-[#252B36]/70">
                Learn how Radio Huns handles and protects your personal
                information.
              </p>
            </div>

            <Link
              href="/privacy-policy"
              className="group inline-flex items-center gap-3 self-start rounded-full border border-[#F04B1F] px-6 py-3 text-sm font-semibold text-[#F04B1F] transition-all duration-300 hover:bg-[#F04B1F] hover:text-[#F7F1E8] sm:self-auto"
            >
              Privacy Policy
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
