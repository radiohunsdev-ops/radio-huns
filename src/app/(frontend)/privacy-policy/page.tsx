import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Radio Huns',
  description:
    'Learn how Radio Huns collects, uses, stores, and protects information when you use our website, mobile application, radio streaming and related services.',
}

const sections = [
  {
    title: '1. Introduction',
    content: [
      `Radio Huns respects your privacy and is committed to protecting the information you provide when using our website, mobile application, radio streaming services, and related features.`,
      `This Privacy Policy explains what information we may collect, how we use it, when it may be shared, and the choices available to you.`,
      `By using Radio Huns, you acknowledge the practices described in this Privacy Policy.`,
    ],
  },

  {
    title: '2. Information We Collect',
    content: [
      `The information we collect depends on how you use Radio Huns. You may use many features of our website without creating an account.`,
    ],
    subsections: [
      {
        title: 'Information You Provide',
        items: [
          'Name or display name.',
          'Email address.',
          'Account credentials or authentication information when applicable.',
          'Information provided when contacting our support team.',
          'Other information you voluntarily provide through the Service.',
        ],
      },
      {
        title: 'Information Collected Automatically',
        items: [
          'IP address and general location information.',
          'Device type and operating system.',
          'Browser type and language preferences.',
          'Application version and technical information.',
          'Information about how you interact with the Service.',
          'Error reports, diagnostic information, and technical logs.',
        ],
      },
    ],
  },

  {
    title: '3. Mobile Application Accounts',
    content: [
      `Certain features of the Radio Huns mobile application may require an account.`,
      `When you create or use an account, we may process information such as your name, email address, authentication provider information, and other information necessary to provide account-related functionality.`,
      `The Radio Huns website can be used without creating a user account unless a particular feature specifically requires one.`,
    ],
  },

  {
    title: '4. How We Use Information',
    content: [`We may use collected information for the following purposes:`],
    list: [
      'Provide, operate, maintain, and improve Radio Huns.',
      'Provide access to radio stations, audio streams, programs, schedules, and other features.',
      'Create and maintain mobile application user accounts.',
      'Authenticate users and protect account security.',
      'Respond to questions, requests, and support inquiries.',
      'Send service-related notifications and communications.',
      'Monitor performance, troubleshoot technical problems, and improve reliability.',
      'Detect, prevent, and investigate fraud, abuse, security incidents, or unauthorized activity.',
      'Comply with applicable legal obligations and enforce our Terms & Conditions.',
    ],
  },

  {
    title: '5. Radio Streaming and Usage Information',
    content: [
      `When you listen to radio stations through Radio Huns, technical information associated with the streaming connection may be processed to deliver and maintain the audio service.`,
      `This may include information such as connection information, device information, technical logs, and basic usage information.`,
    ],
  },

  {
    title: '6. Push Notifications',
    content: [
      `If you enable notifications in the Radio Huns mobile application, we may process information necessary to deliver push notifications to your device.`,
      `Notifications may include information about programs, shows, schedules, station updates, service announcements, or other Radio Huns features.`,
      `You can generally control notification permissions through your device settings.`,
    ],
  },

  {
    title: '7. Cookies and Similar Technologies',
    content: [
      `The Radio Huns website may use cookies, local storage, or similar technologies to provide functionality, remember preferences, improve performance, and understand how the Service is used.`,
      `You may be able to control cookies through your browser settings. Disabling certain cookies may affect the functionality of some parts of the website.`,
    ],
  },

  {
    title: '8. Analytics and Technical Services',
    content: [
      `We may use analytics, hosting, security, infrastructure, crash-reporting, communication, or other technical service providers to operate and improve Radio Huns.`,
      `These providers may process limited information on our behalf and may be subject to contractual, technical, or legal restrictions regarding their use of the information.`,
    ],
  },

  {
    title: '9. Advertising',
    content: [
      `Radio Huns may display advertisements through the website or mobile application.`,
      `Advertising providers may collect or receive certain information in accordance with their own privacy policies and applicable laws.`,
      `Where required by law, we will provide appropriate choices or consent mechanisms regarding personalized advertising and related technologies.`,
    ],
  },

  {
    title: '10. When We Share Information',
    content: [
      `We do not sell your personal information as part of the ordinary operation of Radio Huns.`,
      `We may share information with service providers, contractors, technology providers, analytics providers, security providers, authentication providers, or other partners when reasonably necessary to operate and provide the Service.`,
      `We may also disclose information when required by law, legal process, court order, governmental request, or when necessary to protect the rights, safety, security, or property of Radio Huns, our users, or others.`,
      `Information may also be transferred as part of a merger, acquisition, restructuring, financing, sale of assets, or similar business transaction, subject to applicable law.`,
    ],
  },

  {
    title: '11. Data Retention',
    content: [
      `We retain information for as long as reasonably necessary to provide the Service, maintain accounts, fulfill the purposes described in this Privacy Policy, comply with legal obligations, resolve disputes, enforce agreements, and protect our legitimate interests.`,
      `Retention periods may vary depending on the type of information and the reason it was collected.`,
      `When information is no longer required, we may delete, anonymize, or securely dispose of it, subject to applicable legal requirements.`,
    ],
  },

  {
    title: '12. Data Security',
    content: [
      `We use reasonable administrative, technical, and organizational measures designed to protect information against unauthorized access, alteration, disclosure, misuse, or destruction.`,
      `However, no internet transmission, electronic storage system, or online service can be guaranteed to be completely secure.`,
      `You are responsible for maintaining the security of your account credentials and should notify us promptly if you believe your account has been compromised.`,
    ],
  },

  {
    title: '13. International Data Transfers',
    content: [
      `Depending on where you access Radio Huns and where our service providers operate, your information may be processed or stored in countries other than your country of residence.`,
      `Where required by applicable law, we will use appropriate safeguards for international transfers of personal information.`,
    ],
  },

  {
    title: '14. Your Privacy Rights',
    content: [
      `Depending on your location and applicable law, you may have certain rights regarding your personal information.`,
      `These rights may include requesting access to personal information, correction of inaccurate information, deletion of information, restriction or objection to certain processing, data portability, or withdrawal of consent where processing is based on consent.`,
      `These rights are subject to applicable legal limitations and exceptions.`,
      `To exercise an applicable privacy right, please contact us using the contact information provided on this website.`,
    ],
  },

  {
    title: '15. Account Deletion',
    content: [
      `If you have created an account through the Radio Huns mobile application, you may request deletion of your account through the account-deletion functionality or procedures provided by Radio Huns.`,
      `When an account deletion request is completed, we will delete or anonymize applicable account information in accordance with our retention practices and applicable law.`,
      `Certain information may need to be retained where required by law, necessary to resolve disputes, prevent fraud or abuse, enforce agreements, or protect our legal rights.`,
      `Website users generally do not need to delete an account because the website does not require an account for ordinary access.`,
    ],
  },

  {
    title: '16. Changes to This Privacy Policy',
    content: [
      `We may update this Privacy Policy from time to time to reflect changes in our services, technology, legal requirements, or privacy practices.`,
      `When changes are made, we may update the "Last Updated" date displayed at the beginning of this page.`,
      `Your continued use of Radio Huns after an updated Privacy Policy becomes effective constitutes acknowledgment of the revised policy to the extent permitted by applicable law.`,
    ],
  },

  {
    title: '17. Contact Us',
    content: [
      `If you have questions about this Privacy Policy, our privacy practices, or your personal information, please contact Radio Huns through the contact information provided on our website.`,
      `Please do not send passwords, payment-card information, or other highly sensitive information through general support channels unless specifically requested through an appropriate secure process.`,
    ],
  },
]

export default function PrivacyPolicyPage() {
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
            Privacy
            <span className="block text-[#F9B855]">Policy</span>
          </h1>

          <div className="mt-12 flex flex-col gap-2 text-sm text-[#F7F1E8]/80 sm:flex-row sm:items-center sm:gap-5">
            <span className="font-medium text-[#F7F1E8]">Last Updated</span>

            <span className="hidden sm:block text-[#F7F1E8]/50">•</span>

            <span>August 1, 2020</span>
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-40 border-[#F9B855]/20 sm:h-80 sm:w-80" />
      </section>

      {/* Introduction */}
      <section className="border-b border-[#252B36]/10">
        <div className="mx-auto max-w-300 px-6 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16">
          <p className="max-w-3xl text-lg leading-8 text-[#252B36]/70 md:text-xl md:leading-9">
            This Privacy Policy explains how Radio Huns collects, uses, protects, and handles
            information when you use our website, mobile application, radio streaming services, and
            related features.
          </p>
        </div>
      </section>

      {/* Policy Sections */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 md:px-12 md:py-20 lg:px-16">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className="grid gap-8 border-b border-[#252B36]/10 py-12 md:grid-cols-[260px_1fr] md:gap-16 md:py-16 lg:grid-cols-[280px_1fr] lg:gap-24"
            >
              {/* Heading */}
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

                {/* Main List */}
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

                {/* Subsections */}
                {section.subsections && (
                  <div className="mt-8 space-y-8">
                    {section.subsections.map((subsection) => (
                      <div key={subsection.title}>
                        <h3 className="mb-4 font-semibold text-[#252B36]">{subsection.title}</h3>

                        <ul className="space-y-4">
                          {subsection.items.map((item) => (
                            <li key={item} className="relative pl-7 text-[#252B36]/75">
                              <span className="absolute left-0 top-[0.7rem] h-1.5 w-1.5 rounded-full bg-[#F04B1F]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}

          {/* Related Pages */}
          <div className="mt-10 flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#252B36]/50">Related legal information</p>

              <p className="mt-1 text-base text-[#252B36]/70">
                Please also review our Terms & Conditions.
              </p>
            </div>

            <Link
              href="/terms-and-conditions"
              className="group inline-flex items-center gap-3 self-start rounded-full border border-[#F04B1F] px-6 py-3 text-sm font-semibold text-[#F04B1F] transition-all duration-300 hover:bg-[#F04B1F] hover:text-[#F7F1E8] sm:self-auto"
            >
              Terms & Conditions
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
