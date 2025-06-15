// components/MapIframe.jsx

export default function MapIframe() {
  return (
    <div className="rounded-[20px] overflow-hidden shadow-[0_0_0_1px_#FECBA1] dark:shadow-[0_0_0_1px_#FB923C] border bg-white dark:bg-[#2a1800]">
      <iframe
        title="موقعیت میهن یدک"
        loading="lazy"
        className="h-[330px] w-full"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d685.1747979369381!2d52.33097381657799!3d35.22492264878078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f90ed10522c4211%3A0x1aff9090edd0cb2!2sMIHAN%20YADAK%20GARMSAR!5e0!3m2!1sen!2s!4v1746451203225!5m2!1sen!2s"
      />
    </div>
  );
}
