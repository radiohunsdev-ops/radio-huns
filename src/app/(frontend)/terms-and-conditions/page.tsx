import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Radio Huns',
  description:
    'Read the Terms and Conditions for using Radio Huns website, mobile application, radio streaming and related services.',
}

const sections = [
  {
    title: '1. About Radio Huns',
    content: [
      `Radio Huns is a digital radio platform that provides users with access to live radio stations, audio streams, programs, shows, schedules, and other related content.`,
      `The availability of particular radio stations, programs, shows, audio streams, and other content may vary from time to time.`,
    ],
  },
  {
    title: '2. Eligibility',
    content: [
      `You must be legally capable of entering into a binding agreement under the laws applicable to you to use the Service.`,
      `If you are under the age required to use online services in your jurisdiction, you may use Radio Huns only with the involvement and permission of a parent or legal guardian where required by law.`,
    ],
  },
  {
    title: '3. Use of the Service',
    content: [
      `You agree to use Radio Huns only for lawful purposes and in accordance with these Terms.`,
    ],
    list: [
      'Use the Service for any unlawful or fraudulent purpose.',
      'Attempt to gain unauthorized access to the Service or its systems.',
      'Interfere with or disrupt the operation or security of the Service.',
      'Attempt to bypass technical restrictions or security measures.',
      'Misrepresent your identity or affiliation with another person or organization.',
      'Use the Service in a manner that may damage, disable, overburden, or impair the Service.',
    ],
  },
  {
    title: '4. Radio and Audio Content',
    content: [
      `Radio Huns may provide access to live radio broadcasts and audio content supplied by radio stations, broadcasters, content providers, or other authorized sources.`,
      `Radio Huns does not necessarily own all audio content available through the Service.`,
      `The respective radio stations, broadcasters, artists, labels, producers, licensors, and other rights holders may retain ownership of their respective content.`,
    ],
  },

  {
    title: '5. Intellectual Property',
    content: [
      `All Radio Huns-owned elements of the Service, including the Radio Huns name and branding, logos, graphics, website design, software, source code, user interface, text, original images, artwork, and other proprietary materials are owned by or licensed to Radio Huns and are protected by applicable intellectual-property laws.`,
      `You may not reproduce, distribute, modify, publish, sell, license, or otherwise exploit Radio Huns-owned materials without prior written permission.`,
    ],
  },
  {
    title: '6. User Accounts',
    content: [
      `You can access and use many features of the Radio Huns website without creating an account.`,
      `Certain features available through the Radio Huns mobile application may require you to create and maintain a user account.`,
      `When creating an account through the mobile application, you agree to provide information that is accurate, current, and complete.`,
      `You are responsible for maintaining the confidentiality of your account credentials and for activities conducted through your account.`,
      `You should notify us promptly if you believe your account has been accessed without authorization.`,
      `Radio Huns reserves the right to suspend or terminate accounts that violate these Terms or applicable law.`,
    ],
  },
  {
    title: '7. Account Termination and Deletion',
    content: [
      `Website users may stop using the Radio Huns website at any time without needing to close an account.`,
      `Users who have created an account through the Radio Huns mobile application may request deletion of their account in accordance with the account-deletion functionality or procedures provided by Radio Huns.`,
      `Radio Huns may suspend or terminate a mobile application account if you violate these Terms, create a security or legal risk, interfere with the Service or other users, or if we are required to do so by law.`,
      `Termination or deletion of an account does not affect rights or obligations that arose before termination or deletion.`,
    ],
  },
  {
    title: '8. Service Availability',
    content: [
      `We aim to keep Radio Huns available and reliable, but we do not guarantee that the Service will always be available, uninterrupted, secure, or error-free.`,
      `Radio streams may become temporarily unavailable because of internet connectivity problems, technical failures, maintenance, server issues, changes made by broadcasters or content providers, changes to licensing or authorization, or circumstances outside our reasonable control.`,
      `Radio Huns may modify, suspend, or discontinue any part of the Service at any time.`,
    ],
  },

  {
    title: '9. Privacy',
    content: [
      `Your use of Radio Huns is also governed by our Privacy Policy, which explains how we collect, use, store, and protect personal information.`,
      `By using the Service, you acknowledge that you have read and understood our Privacy Policy.`,
    ],
  },
  {
    title: '10. Disclaimer',
    content: [
      `To the maximum extent permitted by applicable law, Radio Huns provides the Service on an "as is" and "as available" basis.`,
      `We do not guarantee that the Service will always be available, radio streams will always function without interruption, information displayed on the Service will always be accurate or complete, or particular stations, programs, or content will remain available.`,
      `Nothing in these Terms excludes any consumer rights or legal protections that cannot legally be excluded.`,
    ],
  },
  {
    title: '11. Limitation of Liability',
    content: [
      `To the maximum extent permitted by applicable law, Radio Huns and its owners, operators, employees, affiliates, and service providers will not be liable for indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Service.`,
      `Nothing in these Terms limits liability that cannot legally be limited or excluded under applicable law.`,
    ],
  },
  {
    title: '12. Indemnification',
    content: [
      `To the extent permitted by applicable law, you agree to defend, indemnify, and hold harmless Radio Huns and its owners, operators, employees, affiliates, and service providers from claims, liabilities, damages, losses, and expenses arising from your violation of these Terms, misuse of the Service, violation of applicable laws, or infringement of another person's rights.`,
    ],
  },
  {
    title: '13. Copyright Complaints',
    content: [
      `Radio Huns respects the intellectual-property rights of content creators, broadcasters, artists, and other rights holders.`,
      `If you believe that content available through Radio Huns infringes your copyright or other intellectual-property rights, please contact us with sufficient information to identify the copyrighted work, the allegedly infringing content, your contact information, and information supporting your ownership or authorization to act on behalf of the rights holder.`,
    ],
  },
  {
    title: '14. Changes to These Terms',
    content: [
      `We may update these Terms from time to time.`,
      `When we make changes, we may update the "Last Updated" date shown at the beginning of this page.`,
      `Your continued use of Radio Huns after updated Terms become effective constitutes acceptance of the revised Terms, to the extent permitted by applicable law.`,
    ],
  },
  {
    title: '15. Governing Law',
    content: [
      `These Terms shall be governed by and interpreted in accordance with the applicable laws of the jurisdiction in which Radio Huns is legally established, unless applicable law requires otherwise.`,
      `Any disputes shall be handled by the courts or dispute-resolution mechanisms having appropriate jurisdiction, subject to applicable consumer-protection laws.`,
    ],
  },
  {
    title: '16. Severability',
    content: [
      `If any provision of these Terms is found to be invalid, unlawful, or unenforceable, that provision will be modified or removed to the minimum extent necessary, and the remaining provisions will continue in effect.`,
    ],
  },
  {
    title: '17. Entire Agreement',
    content: [
      `These Terms, together with our Privacy Policy and any additional terms applicable to specific features of Radio Huns, constitute the agreement between you and Radio Huns regarding your use of the Service.`,
    ],
  },
]

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#252B36]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F04B1F] text-[#F7F1E8]">
        <div className="mx-auto max-w-350 px-6 pb-20 pt-28 sm:px-8 md:px-12 md:pb-28 md:pt-36 lg:px-16">
          <div className="mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-[#F9B855]">
            <span className="h-px w-10 bg-[#F9B855]" />
            Legal
          </div>

          <h1 className="max-w-5xl font-serif text-[4rem] font-normal leading-[0.88] tracking-[-0.05em] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem]">
            Terms &<span className="block text-[#F9B855]">Conditions</span>
          </h1>

          <div className="mt-12 flex flex-col gap-2 text-sm text-[#F7F1E8]/80 sm:flex-row sm:items-center sm:gap-5">
            <span className="font-medium text-[#F7F1E8]">Last Updated</span>
            <span className="hidden sm:block text-[#F7F1E8]/50">•</span>
            <span>August 1, 2020</span>
          </div>
        </div>

        {/* Decorative shape */}
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-[40px] border-[#F9B855]/20 sm:h-80 sm:w-80" />
      </section>

      {/* Terms */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 md:px-12 md:py-20 lg:px-16">
          <div>
            {sections.map((section, index) => (
              <article
                key={section.title}
                className="grid gap-8 border-b border-[#252B36]/10 py-12 md:grid-cols-[260px_1fr] md:gap-16 md:py-16 lg:grid-cols-[280px_1fr] lg:gap-24"
              >
                {/* Section heading */}
                <div>
                  <h2 className="mt-4 max-w-[250px] font-serif text-2xl font-normal leading-tight tracking-[-0.02em] md:text-3xl">
                    {section.title.replace(/^\d+\.\s*/, '')}
                  </h2>
                </div>

                {/* Content */}
                <div className="max-w-3xl text-[15px] leading-7 text-[#252B36]/75 md:text-base md:leading-8">
                  {section.content.map((paragraph) => (
                    <p key={paragraph} className="mb-5 last:mb-0">
                      {paragraph}
                    </p>
                  ))}

                  {section.list && (
                    <ul className="mt-7 space-y-4">
                      {section.list.map((item) => (
                        <li key={item} className="relative pl-7 text-[#252B36]/75">
                          <span className="absolute left-0 top-[0.7rem] h-1.5 w-1.5 rounded-full bg-[#F04B1F]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Related Pages */}
          <div className="mt-10 flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#252B36]/50">Related legal information</p>

              <p className="mt-1 text-base text-[#252B36]/70">
                Please also review our Privacy Policy.
              </p>
            </div>

            <Link
              href="/privacy-policy"
              className="group inline-flex items-center gap-3 self-start rounded-full border border-[#F04B1F] px-6 py-3 text-sm font-semibold text-[#F04B1F] transition-all duration-300 hover:bg-[#F04B1F] hover:text-[#F7F1E8] sm:self-auto"
            >
              Privacy Policy
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
