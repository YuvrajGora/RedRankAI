import { Search } from "lucide-react";

export default function SearchBar({
    search,
    setSearch,
    minMatch,
    setMinMatch
}) {

    return (

        <div className="glass mb-8 flex flex-col gap-4 rounded-2xl p-6 md:flex-row">

            <div className="relative flex-1">

                <Search
                    size={20}
                    className="absolute left-4 top-4 text-slate-400"
                />

                <input
                    type="text"
                    placeholder="Search by candidate title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 outline-none focus:border-blue-500"
                />

            </div>

            <select
                value={minMatch}
                onChange={(e) => setMinMatch(Number(e.target.value))}
                className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3"
            >

                <option value={0}>All Matches</option>
                <option value={80}>80%+</option>
                <option value={90}>90%+</option>
                <option value={95}>95%+</option>

            </select>

        </div>

    );

}