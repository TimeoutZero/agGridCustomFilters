# =============================================
# Modules
# =============================================
# angular.module 'agGridCustomFilters.controllers' , []
# angular.module 'agGridCustomFilters.filters'     , []
angular.module 'agGridCustomFilters.factories'   , []
angular.module 'agGridCustomFilters.services'    , []
angular.module 'agGridCustomFilters.constants'   , []
# angular.module 'agGridCustomFilters.directives'  , []
# angular.module 'agGridCustomFilters.mocks'       , []
# angular.module 'agGridCustomFilters.providers'   , []



# =============================================
# Scripts Module
# =============================================
angular.module 'agGridCustomFilters.scripts'     , [
  # 'agGridCustomFilters.controllers'
  # 'agGridCustomFilters.filters'
  'agGridCustomFilters.factories'
  'agGridCustomFilters.services'
  'agGridCustomFilters.constants'
  # 'agGridCustomFilters.directives'
  # 'agGridCustomFilters.mocks'
  # 'agGridCustomFilters.providers'
]


# =============================================
# Main Module
# =============================================
angular.module 'agGridCustomFilters', [
  'ngSanitize'
  'ngResource'
  'agGridCustomFilters.scripts'
]