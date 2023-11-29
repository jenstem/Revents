import { useAppSelector } from "../../app/store/store"

export default function Scratch() {
    // specify which slice, so we put state.test
    const {data} = useAppSelector(state => state.test)


    return (
        <div>
        <h1>Scratch page</h1>
        <h3>The data is: {data}</h3>
        </div>
    )
}