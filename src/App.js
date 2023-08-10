import TrainerCard from "./components/TrainerCard"
import Dropdown from "./components/Dropdown";

export default function App() {
  return (
    <div className="">
      <div className="flex py-10 justify-center items-center space-x-4 text-base">
        {/*max 25 characters for trainer name*/}
        <TrainerCard playerName={"Trainer"} playTime={"09:08:11"} money={"122"} badge={""} />
      </div>
      <div className="flex justify-center items-center space-x-4 text-base">
        <form>
          <label className="p-2">
            Name:
            <input className="m-1 border border-black rounded"type="text" name="playerName" />
          </label>          
        </form>
      </div>
      <div className="flex p-2 justify-center items-center space-x-4 text-base">
        <form>
        <label className="p-2">
            Seasons played:
            <input className="m-1 border border-black w-[120px] rounded" type="text" name="playerName" />
          </label>
        </form>
      </div>
      <div className="flex py-10 justify-center items-center space-x-4 text-base">
        <Dropdown />
      </div>
    </div>

  )
}