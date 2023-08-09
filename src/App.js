import TrainerCard from "./components/TrainerCard"

export default function App() {
  return (
    <div>
      <div className="flex py-10 justify-center items-center space-x-4 text-base">
        {/*max 25 characters for trainer name*/}
        <TrainerCard playerName={"Trainer"} playTime={"09:08:11"} money={"122"} badge={""} />
      </div>
    </div>

  )
}