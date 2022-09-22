import { usePlane } from "@react-three/cannon"
import { groundTexture } from "../images/textures"
import { useStore } from '../hooks/useStore'

const GROUND_Y = [0.5, -.5, 0.5]

export const Ground = () => {
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0], position: GROUND_Y
	}))
	const [addCube] = useStore((state) => [state.addCube])

	groundTexture.repeat.set(100, 100)

  return (
		<mesh
			onClick={(e) => {
				e.stopPropagation()
				const [x, y, z] = Object.values(e.point).map(val => Math.round(val)<GROUND_Y ? GROUND_Y*2 : Math.round(val));
				addCube(x, y, z)
			}}
			ref={ref}
		>
			<planeBufferGeometry attach='geometry' args={[100, 100]} />
			<meshStandardMaterial color="grey" attach='material' map={groundTexture} />
		</mesh>
	)
}