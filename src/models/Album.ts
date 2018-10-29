import axios from './../axios'

export default class Album {

	/**
	 * Display a listing of the resource
	 * 
	 * @return {Promise} 
	 */
	public static async index() {
		const response = await axios.get(`albums`)
		return response.data.albums
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  {object} request
	 * @return {Promise} 
	 */
	public static async store(request) {
		const response = await axios.post(`albums`, request)
		return response.data.albumn
	}

	/**
	 * Display the specified resource.
	 * 
	 * @param  {object} id
	 * @return {Promise} 
	 */
	public static async show({ id }) {
		const response = await axios.get(`albums/${id}`)
		return response.data.albumn
	}

	/**
	 * Update the specified resource in storage.
	 * 
	 * @param {object} id, title
	 * @return {object}
	 */
	public static async update({ id, title }) {
		const response = await axios.post(`albums/${id}`, {
			title,
			_method: 'put',
		})
		return response.data.albumn
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param {object} id
	 * @return {Promise} 
	 */
	public static async destroy({ id }) {
		const response = await axios.post(`albums/${id}`, {
			_method: 'delete',
		})
		return response.data
	}
}