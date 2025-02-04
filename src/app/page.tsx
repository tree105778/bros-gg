import BoardWithSelect from "./boardWithSelect";

export default function Home() {
  return (
    <div className="mx-auto my-0 border-2 border-black max-w-[768px]">
      <div className="border-2 border-yellow-500">
        <p>BROS.GG</p>
        <p>배치툴</p>
      </div>
      <div className="flex gap-[6px]">
        <button className="border-2 border-black flex-1 rounded">
          <div>팀 코드</div>
          <div>붙여넣기</div>
        </button>
        <button className="border-2 border-black flex-1 rounded">
          <div>팀 코드</div>
          <div>복사하기</div>
        </button>
        <button className="border-2 border-black flex-1 rounded">
          <div>내 배치툴</div>
          <div>저장하기</div>
        </button>
      </div>
      <BoardWithSelect />
    </div>
  );
}
