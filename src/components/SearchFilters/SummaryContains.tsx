import type { Dispatch, StateUpdater } from 'preact/hooks'

interface Props {
    SummaryContains: string
    SetSummaryContains: Dispatch<StateUpdater<string>>
    TmapOwner?: string
}

export default function SearchSummmaryContains(props: Props) {
    const { 
        SummaryContains: summary_contains, 
        SetSummaryContains: set_summary_contains,
        TmapOwner: tmap_owner
    } = props

    return (
        <div>
            <label id='search-summary-contains' for='summary-snippet'>
                {tmap_owner ? `${tmap_owner}'s` : 'Global'} Summary Contains:
            </label>
            <input
                id='summary-snippet'
                type='text'
                value={summary_contains}
                onInput={(e: InputEvent) => {
                    set_summary_contains((e.target as HTMLInputElement).value)
                }}
            />
        </div>
    )
}
