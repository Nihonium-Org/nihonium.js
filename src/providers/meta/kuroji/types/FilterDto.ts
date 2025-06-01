import type {
	AgeRating,
	Language,
	MediaFormat,
	MediaSeason,
	MediaSort,
	MediaSource,
	MediaStatus,
	MediaType,
} from './Filter';

export class FilterDto {
	constructor(partial?: Partial<FilterDto>) {
		Object.assign(this, partial);
	}

	sort?: MediaSort[];
	perPage?: number;
	page?: number;
	sourceIn?: MediaSource[];
	popularityLesser?: number;
	popularityGreater?: number;
	popularityNot?: number;
	scoreLesser?: number;
	scoreGreater?: number;
	scoreNot?: number;
	tagCategoryNotIn?: string[];
	tagCategoryIn?: string[];
	tagNotIn?: string[];
	tagIn?: string[];
	studioIn?: string[];
	characterIn?: string[];
	voiceActorIn?: string[];
	genreNotIn?: string[];
	genreIn?: string[];
	durationLesser?: number;
	durationGreater?: number;
	episodesLesser?: number;
	episodesGreater?: number;
	statusNotIn?: MediaStatus[];
	statusNot?: MediaStatus;
	statusIn?: MediaStatus[];
	formatNotIn?: MediaFormat[];
	formatNot?: MediaFormat;
	formatIn?: MediaFormat[];
	endDateLike?: string;
	endDateLesser?: string;
	endDateGreater?: string;
	startDateLike?: string;
	startDateLesser?: string;
	startDateGreater?: string;
	idMalNotIn?: number[];
	idMalIn?: number[];
	idMalNot?: number;
	idNotIn?: number[];
	idIn?: number[];
	idNot?: number;
	query?: string;
	countryOfOrigin?: string;
	isAdult?: boolean;
	nsfw?: boolean;
	isLicensed?: boolean;
	format?: MediaFormat;
	type?: MediaType;
	status?: MediaStatus;
	season?: MediaSeason;
	language?: Language;
	ageRating?: AgeRating[];
	idMal?: number;
	id?: number;
}

export function convertFilterToParams(filter: FilterDto): Record<string, string> {
	const params: Record<string, string> = {};

	for (const [key, value] of Object.entries(filter)) {
		if (value === undefined || value === null) continue;

		if (Array.isArray(value)) {
			if (value.length > 0) {
				params[key] = value.join(',');
			}
		} else if (typeof value === 'boolean') {
			params[key] = value.toString();
		} else if (typeof value === 'number' || typeof value === 'string') {
			params[key] = value.toString();
		}
	}

	return params;
}
