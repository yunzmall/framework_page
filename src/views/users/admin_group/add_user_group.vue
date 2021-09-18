<template>
  <admin-user-detail :is-edit="false"/>
</template>

<script>
import AdminUserDetail from '../components/user_group_details'

export default {
  name: 'AddUser',
  components: { AdminUserDetail }
}
</script>

