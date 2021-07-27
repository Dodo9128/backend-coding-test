## ATEAM-Ventures-coding-test API docs

| Method | URL               | Body                                            | response                                                                                   |
| ------ | ----------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| get    | /                 | null                                            | ` capa API Server is running `                                                             |
| get    | /get-all-list     | null                                            | [{"name": "St_Albans","postcode": "AL1 2RJ"}, {"name": "Hatfield","postcode": "AL9 5JP"}..]|
| get    | /get-specific     | ` { "storeName": "Worthing" } `                 | ` { "name": "Worthing", "postcode": "BN14 9GB" } `                                         |
| get    | /get-position     | ` { "postcode": "BN14 9GB" } `                  | ` { "longitude": -0.366858, "latitude": 50.834431 } `                                      |
| get    | /get-radius-store | ` { "postcode": "BN14 9GB" } `                  | `[{"name": "Hove", "postcode": "BN3 7PN"}, {"name": "Worthing", "postcode": "BN14 9GB"}..]`|
