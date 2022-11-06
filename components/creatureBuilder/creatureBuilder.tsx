import React, { FC } from 'react'
import { Creature } from '../model'
import styles from './creatureBuilder.module.scss'

type PropType = {
    creature: Creature,
    onCreatureChange?: (newValue: Creature) => void,
    onCreatureDelete?: () => void,
}

const CreatureBuilder:FC<PropType> = ({ creature, onCreatureChange, onCreatureDelete }) => {
    function doUpdate(updateCallback: (clone: Creature) => void) {
        const clone = JSON.parse(JSON.stringify(creature))
        updateCallback(clone)
        if (onCreatureChange) onCreatureChange(clone)
    }

    return (
        <div className={styles.creature}>
            
            {/* NAME */}
            <div className={styles.inputGroup}>
                <label>Creature Name</label>
                <input type={'text'} value={creature.name} placeholder={"Creature Name"} className={styles.name} onChange={(event) => doUpdate((clone) => {
                    clone.name = event.target.value
                })} />
            </div>

            {/* COUNT */}
            <div className={styles.inputGroup}>
                <label>Count</label>
                <div className={styles.count}>
                    <button onClick={() => doUpdate(clone => {
                        clone.count = Math.max(1, clone.count - 1)
                    })}>-</button>
                    {creature.count}
                    <button onClick={() => doUpdate(clone => {
                        clone.count = Math.min(20, clone.count + 1)
                    })}>+</button>
                </div>
            </div>

            {/* HP */}
            <div className={styles.inputGroup}>
                <label>
                    HP
                    <div className={styles.tooltip}>
                        <p>Hit Points</p>
                    </div>
                </label>
                <input type={'number'} value={creature.hp} placeholder={"Hit Points"} min={0} onChange={(event) => doUpdate((clone) => {
                    clone.hp = Number(event.target.value)
                })} />
            </div>

            {/* DPR */}
            <div className={styles.inputGroup}>
                <label>
                    DPR
                    <div className={styles.tooltip}>
                        <p>Damage Per Round</p>
                    </div>
                </label>
                <input type={'number'} value={creature.dpr} placeholder={"Damage Per Round"} min={0} onChange={(event) => doUpdate((clone) => {
                    clone.dpr = Number(event.target.value)
                })} />
            </div>

            {/* TO HIT */}
            <div className={styles.inputGroup}>
                <label>To hit</label>
                <input type={'number'} value={creature.toHit} placeholder={"To Hit bonus"} onChange={(event) => doUpdate((clone) => {
                    clone.toHit = Number(event.target.value)
                })} />
            </div>

            {/* AC */}
            <div className={styles.inputGroup}>
                <label>
                    AC
                    <div className={styles.tooltip}>
                        <p>Armor Class</p>
                    </div>
                </label>
                <input type={'number'} value={creature.AC} placeholder={"AC"} min={1} onChange={(event) => doUpdate((clone) => {
                    clone.AC = Number(event.target.value)
                })} />
            </div>
            
            {/* TARGET */}
            <div className={styles.inputGroup}>
                <label>Target</label>
                <select value={creature.target} placeholder={"Target"} onChange={(event) => doUpdate((clone) => {
                    clone.target = event.target.value as any
                })} >
                    <option value={"enemy with least HP"}>Lowest HP</option>
                    <option value={"enemy with most HP"}>Highest HP</option>
                    <option value={"enemy with highest DPR"}>Highest DPR</option>
                    <option value={"enemy with highest AC"}>Highest AC</option>
                    <option value={"enemy with lowest AC"}>Lowest AC</option>
                </select>
            </div>

            <button className={styles.deleteCreatureBtn} onClick={onCreatureDelete}>
                X
            </button>
        </div>
    )
}

export default CreatureBuilder