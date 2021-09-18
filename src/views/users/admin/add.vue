<template>
  <admin-user-detail :is-edit="false"/>
</template>

<script>
import AdminUserDetail from '../components/admin_user_details'

export default {
  name: 'AddUser',
  components: { AdminUserDetail }
}
</script>

