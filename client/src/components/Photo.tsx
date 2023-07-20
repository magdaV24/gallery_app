
interface Props {
  source: string;
}
export default function Photo({ source }: Props) {
  return (
    <div className="photo-container">
      <div className="photo-wrapper">
        <img src={source} alt="welcome-page-photo" />
      </div>
    </div>
  );
}
