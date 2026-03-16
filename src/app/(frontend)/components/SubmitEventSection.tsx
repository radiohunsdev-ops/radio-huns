export default function SubmitEventSection() {
  return (
    <section className="min-h-screen grid grid-cols-[40%_60%] font-serif">
      <div className=" bg-[#EADCC8]  flex flex-col justify-between">
        <div className="px-20 py-24">
          <h1 className="font-serif text-[80px] font-extrabold leading-[0.95] text-[#E55322]">
            Submit an <br /> event
          </h1>
          <p className="mt-10 max-w-md text-[#E55322] text-lg leading-relaxed">
            Please submit your event details using the form.
            <br />
            Once your event has been approved, it will be added to the community calendar.
          </p>
        </div>
        <div className="relative w-full h-[80vh] overflow-hidden">
          <div className="section-form-filler ">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              fill="#E75023"
              viewBox="0 0 343.6 287.2"
              xmlSpace="preserve"
            >
              <path d="M5.8,253.9c12.1,0,24-2.3,35.2-6.8c11.6-4.7,22.1-11.6,30.9-20.5c8.9-8.9,15.9-19.6,20.6-31.3 c4.5-11.3,6.8-23.3,6.7-35.5c0-12-2.3-23.8-6.9-34.8c-4.7-11.4-11.6-21.8-20.4-30.5C63.4,86,53.4,79.2,42.4,74.4 c-10.7-4.7-22.2-7.1-33.9-7.2c-2.3,0-4.7,0.1-7.1,0.2L0,67.5v16.6L1.6,84c2.3-0.2,4.6-0.3,6.9-0.3c9.4,0,18.7,2,27.3,5.8 c9.1,4,17.3,9.6,24.3,16.6c7.2,7.2,12.9,15.7,16.8,25.1c3.7,9,5.7,18.7,5.7,28.5c0,10-1.8,20-5.5,29.4c-3.8,9.6-9.6,18.4-16.9,25.7 c-7.3,7.3-15.9,13-25.4,16.9c-9.2,3.7-19,5.6-29,5.6c-1.3,0-2.8,0-4.2-0.1L0,237.2v16.6l1.4,0.1C2.9,253.9,4.3,253.9,5.8,253.9z"></path>
              <path d="M5.7,220.4c7.7,0,15.4-1.5,22.5-4.4c15-6.1,26.9-17.9,33-32.9c5.8-14.4,5.8-30.6,0-45 c-6.1-14.9-17.9-26.8-32.9-32.9c-8.5-3.5-17.7-4.9-26.9-4.2L0.1,101v16.7l1.6-0.2c1.4-0.1,2.8-0.2,4.2-0.2 c11.4,0,22.4,4.5,30.5,12.6l0,0C44.4,138.1,49,149,49,160.5c0,5.6-1.1,11.1-3.2,16.3c-4.4,10.8-13,19.4-23.8,23.8 c-5.2,2.1-10.7,3.2-16.4,3.2c-1.3,0-2.7-0.1-4-0.2L0,203.4v16.7l1.4,0.1C2.8,220.3,4.3,220.4,5.7,220.4z"></path>
              <path d="M285.7,260.8c-23.8-23.8-56.1-37.2-89.8-37.1c-13.4,0-26.8,2.1-39.6,6.3c-13.1,4.3-25.4,10.6-36.4,18.9 l-0.4,0.3l-0.1,0.1c-9.4,7.1-17.8,15.4-24.9,24.8c0,0.1-0.1,0.1-0.1,0.2c-0.3,0.4-0.6,0.7-0.8,1.1c-2.1,2.8-4.1,5.8-5.9,8.8 l-1.9,3.1h19.8l1.9-2.6c3.2-4.2,6.6-8.3,10.4-12c3.7-3.8,7.7-7.2,12-10.4l0.5-0.4c9.5-7,20-12.4,31.2-16c24.9-8.1,51.8-7.2,76,2.6 c13.7,5.5,26.1,13.8,36.5,24.2c4.1,4.1,7.9,8.6,11.3,13.3l1,1.3H306l-1.9-3C298.9,275.7,292.7,267.9,285.7,260.8z"></path>
              <path d="M231,264.1c-34.4-14-73.9-6.2-100.5,19.8l-3.3,3.3l25.1,0l1.7-1c25.5-16.5,58.3-16.5,83.7,0l1.5,1h25.5 l-3.6-3.3C252.5,275.4,242.3,268.7,231,264.1z"></path>
              <path d="M342.2,284.3c-31.1-68.5-105.5-106.3-179.2-90.9c2.2-10.8,3.4-21.8,3.4-32.8c0-20.7-4-41.3-11.8-60.5 c-8.1-19.9-20.1-38-35.3-53.2c-15.5-15.5-34-27.6-54.4-35.6C45.3,3.8,24.4-0.1,3.3-0.1H1.5H0v16.6h1.5h1.8 c19-0.1,37.9,3.4,55.6,10.3c18.3,7.1,34.9,17.9,48.7,31.8c13.6,13.6,24.4,29.8,31.7,47.7c7,17.2,10.6,35.6,10.5,54.2 c0,12.7-1.7,25.4-5,37.7c-7.1,2.4-14.1,5.3-20.8,8.6c0.9-2.3,1.7-4.6,2.5-6.9c4.2-12.8,6.3-26.1,6.3-39.5c0-16.4-3.2-32.6-9.3-47.7 c-6.4-15.7-15.8-30-27.9-42C83.7,58.8,69.6,49.4,54,43c-15-6.2-31.2-9.4-47.4-9.4c-1.6,0-3.3,0-5.2,0.1L0,33.8v16.6l1.6-0.1 c1.7-0.1,3.4-0.1,5.1-0.1c14.1,0,28.1,2.8,41.1,8.1c13.5,5.6,25.8,13.8,36.2,24.2c10.4,10.4,18.7,22.8,24.2,36.5 c5.4,13.2,8.1,27.3,8.1,41.6c0,11.7-1.8,23.3-5.4,34.4c-3.6,11-8.9,21.4-15.7,30.7c-8.9,7.2-17,15.2-24.2,24.1 c-9.3,6.8-19.7,12.1-30.7,15.7c-11.1,3.6-22.7,5.4-34.3,5.4c-1.3,0-2.6,0-4.2-0.1l-1.5,0v16.6l1.4,0c1.7,0,3,0.1,4.3,0.1 c5.3,0,10.5-0.3,15.8-1l0.9-0.1c7.7-1,15.4-2.7,22.8-5.1c2.3-0.7,4.6-1.6,6.9-2.5c-0.9,1.8-1.8,3.7-2.6,5.5l-1.2,2.9h18.3l0.6-1.7 c6.9-13.6,15.9-26.1,26.8-36.8c16.7-16.8,37.3-29.1,60-36c67-20.3,138.8,10.4,170.5,72.8l0.8,1.6h18.3L342.2,284.3z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-[#F6F1E7] px-24 py-20">
        <form className="space-y-14 max-w-3xl">
          <FormField label="Organiser’s name *" />
          <div className="grid grid-cols-2 gap-16">
            <FormField label="Email address *" />
            <FormField label="Telephone number *" />
          </div>
          <FormField label="Event title *" />
          <div className="grid grid-cols-2 gap-16">
            <FormField label="Event date *" />
            <FormField label="Event time *" />
          </div>
          <FormTextarea label="Event location/address *" rows={2} />
          <FormTextarea label="Free or paid? (Add ticketing links if applicable) *" rows={3} />
          <FormTextarea label="Event description *" rows={3} />
          <div className="flex items-center justify-between pt-8">
            <p className="text-sm text-[#E55322]">* Mandatory fields</p>
            <button className="flex items-center gap-4 text-[#E55322] font-semibold text-lg">
              Send
              <span className="w-10 h-10 rounded-full border border-[#E55322] flex items-center justify-center">
                →
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

function FormField({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-[#E55322] text-[16px] font-bold">{label}</label>
      <input
        type="text"
        className="bg-transparent border-b border-black/70 focus:outline-none focus:border-[#E55322] py-1"
      />
    </div>
  )
}

function FormTextarea({ label, rows }: { label: string; rows: number }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-[#E55322] text-[16px] font-bold">{label}</label>
      <textarea
        rows={rows}
        className="bg-transparent border-b border-black/70 focus:outline-none focus:border-[#E55322] resize-none"
      />
    </div>
  )
}
