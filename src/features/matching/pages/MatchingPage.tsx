import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import styles from "./MatchingPage.module.css"
import MatchForm from "@/features/matching/components/MatchForm/MatchForm.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Select from "@/shared/components/select/Select.tsx";
import SelectItem from "@/shared/components/select/SelectItem.tsx";
import useMatching from "@/features/matching/hooks/useMatching.ts";
import MatchResult from "@/features/matching/components/MatchResult/MatchResult.tsx";
import Container from "@/shared/components/container/Container.tsx"
import type { MatchResultDto } from "@/shared/types";

type SortBy = "match" | "price" | "driver_score";

const SORTERS: Record<SortBy, (a: MatchResultDto, b: MatchResultDto) => number> = {
    match: (a, b) => (b.score ?? 0) - (a.score ?? 0),
    price: (a, b) => (a.price?.amountInCents ?? 0) - (b.price?.amountInCents ?? 0),
    driver_score: (a, b) => (b.owner?.avgRating ?? 0) - (a.owner?.avgRating ?? 0),
};

export default function MatchingPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { search, matches, isLoading, error, hasSearched } = useMatching();
    const [sortBy, setSortBy] = useState<SortBy>("match");

    const parcelId = searchParams.get("parcelId") ?? "";
    const sortedMatches = [...matches].sort(SORTERS[sortBy]);

    function handleSearch(date: string) {
        setSearchParams({ parcelId });
        void search(parcelId, date);
    }

    return (
        <div className={styles.container}>
            { !hasSearched && <Container align="center">
                <Text tag="h1" align="center" weight="bold" animate="slideUp" delay={100} maxWidth={800} lineHeight={1.1} letterSpacing={1} className={styles.title}>
                    Trouver le meilleur trajet pour votre colis
                </Text>
            </Container> }

            <MatchForm
                parcelId={parcelId}
                onSearch={handleSearch}
                isLoading={isLoading}
                error={error}
            />

            {isLoading && (
                <div className={styles.state_container}>
                    <Spinner />
                </div>
            )}

            {!isLoading && hasSearched && !error && matches.length === 0 && (
                <div className={styles.empty_state}>
                    <SearchX size={48} className={styles.empty_icon} />
                    <Text tag="h3" weight="bold" className={styles.empty_title}>Aucun trajet trouvé</Text>
                    <Text tag="p" muted align="center" className={styles.empty_text}>
                        Essayez une autre date ou un autre colis.
                    </Text>
                </div>
            )}

            {!isLoading && matches.length > 0 && (
                <>
                    <div className={styles.results_header}>
                        <Text tag="h2" weight="bold" className={styles.results_title}>Résultat</Text>
                        <div className={styles.sort_select}>
                            <Select
                                id="sortBy"
                                value={sortBy}
                                variant="pill"
                                onChange={(value) => setSortBy(value as SortBy)}
                            >
                                <SelectItem value="match">Meilleur match</SelectItem>
                                <SelectItem value="price">Prix</SelectItem>
                                <SelectItem value="driver_score">Note du livreur</SelectItem>
                            </Select>
                        </div>
                    </div>

                    <div className={styles.results_container}>
                        {sortedMatches.map((match, i) => (
                            match && <MatchResult key={i} result={match}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
