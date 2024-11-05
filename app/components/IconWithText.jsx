export default function IconWithText({img, title, content}) {
  return (
    <div className="flex flex-col max-w-[180px] gap-6 items-center">
      <img src={img} alt={title} />
      <h3 className="text-center">{title}</h3>
      <p className="text-center">{content}</p>
    </div>
  );
}
